import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js"
import { withTransaction } from "../../utils/dbTranaction.js"
import { getSequenceWithRowLock, addOneToSequenceWithRowLock } from "../../utils/sequenceManager.js"
import { addItems } from "../docket_items/items.models.js";
import { addEwayBills } from "../docket_ewayBills/ewaybills.models.js";
import { addTruckFrieght } from "../docket_truck_frieght/frieght.models.js";
import { addPartyFrieght } from "../docket_party_frieght/frieght.models.js";
import { getNextAvailableNumber } from "../sequenceManager/sequenceManager.models.js";
import { getBranchWiseConsignorPartiesWithProducts } from "../consignorParty/consignorParty.model.js";
import { viewAllSizes } from "../vehicle_size/vehicle_size.models.js";
import { getBranchWiseConsigneeParties } from "../consigneeParty/consigneeParty.model.js";
import { viewBranches } from "../branch/branch.models.js";
import { addNewVehicle } from "../vehicle/vehicle.models.js";
import { checkIdempotency } from "../../utils/idempotency.js";


// {
//     "source": "Kolkata",
//     "docket_items": [
//         {
//             "product_name": "Cement Bags",
//             "total_packages": "46",
//             "packaging_method": "bag",
//             "declared_value": "50000"
//         },
//         {
//             "product_name": "Flyash Bricks",
//             "total_packages": "400",
//             "packaging_method": "box",
//             "declared_value": "400000"
//         }
//     ],
//     "truck_freight": {
//         "grand_total": 14442,
//         "freightamt": "12000",
//         "advance": "10000",
//         "balance": 2000,
//         "labour": "111",
//         "holding": "333",
//         "multipoint_pickup": "444",
//         "multipoint_delivery": "666",
//         "other_charges": "888"
//     },
//     "party_freight": {
//         "grand_total": 23563,
//         "freightamt": "18000.00",
//         "labour": "222",
//         "holding": "444",
//         "multipoint_pickup": "555",
//         "multipoint_delivery": "777",
//         "docket_charge": "999",
//         "green_tax": "888",
//         "other_charges": "677",
//         "gst_remark": "5%",
//         "gst_amt": "656",
//         "other_state_tax_remark": "4%",
//         "other_state_tax_amt": "345"
//     },
//     "billing_branch_id": 2,
//     "docket_no": "KOL-2026-000025",
//     "docket_date": "07 Jun 26",
//     "branch_id": "2",
//     "eway_bills": [
//         {
//             "invoice_no": "ABC-1",
//             "eway_bill_no": "111111111111"
//         },
//         {
//             "invoice_no": "AAA",
//             "eway_bill_no": "222222222222"
//         }
//     ],
//     "consignor_id": 2,
//     "consignee_id": 10,
//     "truck_details": {
//         "truck_no": "MP-09-ST-2233",
//         "actual_weight": "7200.00",
//         "driver_name": "Shivraj Chouhan",
//         "driver_phone": "9425098765",
//         "size_id": 2
//     },
//     "charged_weight": "5000",
//     "destination": "Delhi",
//     "remarks": "agzsfgsdgsfdgfx",
//     "gstin_payable_by": "Consignee",
//     "payment_mode": "NEFT",
//     "vehicle_id": 10
// }


export const addDocket = async (newDocketData) => {

  try {

    const { request_id } = newDocketData;

    if (!request_id) {
      // throw new AppError("request_id is required", 400);
    }


    return await withTransaction(async (connection) => {

      const existing = await checkIdempotency(connection, request_id);

      if (existing) {
        return {
          message: "Docket already created",
          docketNo: existing.docket_no,
        };
      }

      const { branch_code, docket_items, eway_bills, truck_freight, party_freight, truck_details } = newDocketData;

      const currentYear = new Date().getFullYear();
      const docket_sequence_name = "DKT-" + branch_code + "-" + currentYear;

      const next_number = await getSequenceWithRowLock(connection, docket_sequence_name)

      const docket_no =
        `${branch_code}-${currentYear}-${next_number.toString().padStart(6, "0")}`;

      newDocketData.docket_no = docket_no;



      if (!newDocketData.vehicle_id) {


        const result1 = await addNewVehicle(truck_details)
        // console.log(!result1.data.vehicleId)

        
        if (result1.affectedRows !== 1 && !result1.data.vehicleId) {
          throw new AppError("Failed to insert Vehicle", 500);
        }

        newDocketData.vehicle_id = result1.data.vehicleId;
        delete newDocketData.truck_details;
      }

      // console.log(newDocketData.vehicle_id)

      delete newDocketData.branch_code;
      delete newDocketData.docket_items;
      delete newDocketData.eway_bills;
      delete newDocketData.truck_freight;
      delete newDocketData.party_freight;

      const { query, values } = buildInsertQuery("dockets", newDocketData);

      const [result] = await connection.query(query, values);

      if (result.affectedRows !== 1) {
        throw new AppError("Failed to insert docket.", 500);
      }

      let insertedItemsCount = 0;
      for (const item of docket_items) {
        item.docket_no = docket_no;
        const result = await addItems(item, connection);
        if (result.itemInsertID) {
          insertedItemsCount++;
        }
      }
      if (insertedItemsCount < 1) {
        throw new AppError("No Item Added in the Docket", 500);
      }

      let insertedewayBillsCount = 0;
      for (const ewayBill of eway_bills) {
        ewayBill.docket_no = docket_no;
        const result = await addEwayBills(ewayBill, connection);
        if (result.ewayBillInsertID) {
          insertedewayBillsCount++;
        }
      }

      if (insertedewayBillsCount < 1) {
        throw new AppError("No Eway Bill Added in the Docket", 500);
      }

      truck_freight.docket_no = docket_no;
      const truckFrieghtResult = await addTruckFrieght(truck_freight, connection)

      if (truckFrieghtResult.frieghtInsertID < 1) {
        throw new AppError("Truck Frieght Not Added in the Docket", 500);
      }

      party_freight.docket_no = docket_no;
      const partyFrieghtResult = await addPartyFrieght(party_freight, connection)

      if (partyFrieghtResult.frieghtInsertID < 1) {
        throw new AppError("Party Frieght Not Added in the Docket", 500);
      }

      const updateSequence = await addOneToSequenceWithRowLock(connection, docket_sequence_name)
      if (updateSequence) {
        return {
          message: `Docket added successfully`,
          docketNo: docket_no,
          itemCount: insertedItemsCount,
          ewayBillsCount: insertedewayBillsCount,
          truckFrieghtInseertID: truckFrieghtResult.frieghtInsertID,
          partyFrieghtInseertID: partyFrieghtResult.frieghtInsertID

        };

      } else {
        throw new AppError("Sequence not Updated after adding. Docket not saved you can try again", 500)
      }

    });



  } catch (error) {

    console.log(error)
    if (error instanceof AppError) {
      throw error
    }

    if (error.code === "ER_DUP_ENTRY") {

      if (error.sqlMessage.includes("unique_request_id")) {
        // fetch existing and return
        const pool = getPool();
        const [rows] = await pool.query(
          `SELECT docket_no FROM dockets WHERE request_id = ?`,
          [newDocketData.request_id]
        );

        return {
          message: "Docket already created",
          docketNo: rows[0].docket_no,
        };
      }

      throw new AppError("Docket already exists.", 409);
    }


    // Foreign key error
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      if (error.sqlMessage.includes("branch_id")) {
        throw new AppError("Branch ID Not Found", 400);
      }

      if (error.sqlMessage.includes("party_id")) {
        throw new AppError("Party ID Not Found", 400);
      }
      if (error.sqlMessage.includes("vehicle_id")) {
        throw new AppError("Vehicle ID Not Found", 400);
      }


    }

    console.error("Unexpected DB Error:", error);
    throw new AppError("Database error while adding Docket.", 500);
  }
};

export const viewDockets = async () => {
  try {
    const connectionPool = getPool();
    if (!connectionPool) {
      throw new AppError("Database connection not initialized.", 500);
    }
    const [result] = await connectionPool.query(
      `SELECT * FROM DOCKETS`
    );

    if (result.length === 0) {
      throw new AppError(
        `No Docket found`,
        404
      );
    }
    // console.log(result)
    return result;
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);

  }
}

export const viewDocketDetails = async (docketNo) => {
  try {
    const connectionPool = getPool();
    if (!connectionPool) {
      throw new AppError("Database connection not initialized.", 500);
    }
    const [result] = await connectionPool.query(
      `SELECT * FROM DOCKETS WHERE docket_no = ?`, [docketNo]
    );

    if (result.length === 0) {
      throw new AppError(
        `Docket: '${docketNo}' not found`,
        404
      );
    }
    // console.log(result)
    return result;
  } catch (error) {
    console.log(error)

    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);

  }
}


export const getDestinationListBranchWise = async (branch_id) => {
  try {
    const connectionPool = getPool();
    if (!connectionPool) {
      throw new AppError("Database connection not initialized.", 500);
    }
    const [result] = await connectionPool.query(
      `SELECT destination as value, destination as label, 
       COUNT(*) AS total
        FROM dockets
        WHERE branch_id = ?
        GROUP BY destination
        ORDER BY total DESC
        LIMIT 20;`, [branch_id]
    );

    if (result.length === 0) {
      throw new AppError(
        `No Destination City Found`,
        404
      );
    }
    // console.log(result)
    return result;
  } catch (error) {

    console.log(error)
    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);

  }
}




export const getSourceListBranchWise = async (branch_id) => {
  try {
    const connectionPool = getPool();
    if (!connectionPool) {
      throw new AppError("Database connection not initialized.", 500);
    }
    const [result] = await connectionPool.query(
      `SELECT source as value,source as label,
       COUNT(*) AS total
        FROM dockets
        WHERE branch_id = ?
        GROUP BY source
        ORDER BY total DESC
        LIMIT 20;`, [branch_id]
    );

    if (result.length === 0) {
      throw new AppError(
        `No Source City Found`,
        404
      );
    }
    return result;
  } catch (error) {

    console.log(error)
    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);

  }
}


export const getNewDocketData = async ({ branch_code, branch_id }) => {
  try {

    //Docket No.
    const currentYear = new Date().getFullYear();
    const docket_sequence_name = "DKT-" + branch_code + "-" + currentYear;
    const { next_number } = await getNextAvailableNumber(docket_sequence_name)
    let docket_no;
    if (next_number) {
      docket_no =
        `${branch_code}-${currentYear}-${next_number.toString().padStart(6, "0")}`;
    }

    //source list
    const sourcelist = await getSourceListBranchWise(branch_id)

    //destination list
    const destinationlist = await getDestinationListBranchWise(branch_id)

    //ConsignorPartie
    const consignorParties = await getBranchWiseConsignorPartiesWithProducts(branch_id)

    //ConsignorPartie
    const consigneeParties = await getBranchWiseConsigneeParties(branch_id)


    //vehicle size
    const vehicle_sizes = await viewAllSizes();

    //branch list
    const branch_list = await viewBranches()




    return {
      docketNo: docket_no,
      consignorParties: consignorParties,
      consigneeParties: consigneeParties,
      sourcelist: sourcelist,
      destinationlist: destinationlist,
      vehicle_sizes: vehicle_sizes,
      branch_list: branch_list

    }
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);
  }

}