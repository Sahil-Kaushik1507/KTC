import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js"
import { withTransaction } from "../../utils/dbTranaction.js"
import { getSequenceWithRowLock, addOneToSequenceWithRowLock } from "../../utils/sequenceManager.js"
import { addItems } from "../docket_items/items.models.js";
import { addEwayBills } from "../docket_ewayBills/ewaybills.models.js";
import { addFrieght } from "../docket_frieght/frieght.models.js";


// sampledata
// {
//   "docket_no": "HDW-2026-00045",
//   "branch_id": 1,
//   "docket_date": "2026-03-24",
//   "source": "Haridwar",
//   "destination": "Delhi",
//   "vehicle_id": 5,
//   "charged_weight": 9000.50,
//   "consignor_id": 12,
//   "consignee_id": 18,
//   "payment_mode": "TO_PAY",
//   "billing_branch_id": 2,
//   "gstin_payable_by": "CONSIGNEE",
//   "remarks": "Handle with care. Fragile goods."
// }

export const addDocket = async (newDocketData) => {

  try {

    return await withTransaction(async (connection) => {

      const { branch_code, items, ewayBills, frieght } = newDocketData;

      const currentYear = new Date().getFullYear();
      const docket_sequence_name = "DKT-" + branch_code + "-" + currentYear;

      const next_number = await getSequenceWithRowLock(connection, docket_sequence_name)

      const docket_no =
        `${branch_code}-${currentYear}-${next_number.toString().padStart(6, "0")}`;

      newDocketData.docket_no = docket_no;


      delete newDocketData.branch_code;
      delete newDocketData.items;
      delete newDocketData.ewayBills;
      delete newDocketData.frieght;

      const { query, values } = buildInsertQuery("dockets", newDocketData);

      const [result] = await connection.query(query, values);

      if (result.affectedRows !== 1) {
        throw new AppError("Failed to insert docket.", 500);
      }

      let insertedItemsCount = 0;
      for (const item of items) {
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
      for (const ewayBill of ewayBills) {
        ewayBill.docket_no = docket_no;
        const result = await addEwayBills(ewayBill, connection);
        if (result.ewayBillInsertID) {
          insertedewayBillsCount++;
        }
      }

      if (insertedewayBillsCount < 1) {
        throw new AppError("No Eway Bill Added in the Docket", 500);
      }
      
      frieght.docket_no = docket_no;
      const frieghtResult = await addFrieght(frieght, connection)
     
      if (frieghtResult.frieghtInsertID<1) {
        throw new AppError("No Frieght Added in the Docket", 500);
      }

      const updateSequence = await addOneToSequenceWithRowLock(connection, docket_sequence_name)
      if (updateSequence) {
        return {
          message: `Docket added successfully`,
          docketNo: docket_no,
          itemCount: insertedItemsCount,
          ewayBillsCount: insertedewayBillsCount,
          frieghtInseertID: frieghtMsg.frieghtInsertID

        };

      } else {
        throw new AppError("Sequence not Updated after adding. Docket not saved you can try again", 500)
      }

    });



  } catch (error) {

    if (error instanceof AppError) {
      throw error
    }

    if (error.code === "ER_DUP_ENTRY") {
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


    if (error instanceof AppError) {
      throw error;
    }
    console.error("DB Error:", error);
    throw new AppError("Database error while geting docket details.", 500);

  }
}