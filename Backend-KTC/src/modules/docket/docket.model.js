import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js"


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

    const connectionPool = getPool();
    if (!connectionPool) {
      throw new AppError("Database connection not initialized.", 500);
    }

    const { query, values } = buildInsertQuery("dockets", newDocketData);

    const [result] = await connectionPool.query(query, values);


    if (result.affectedRows == 1) {
      return {
        message: `Docket added successfully`,
        docketNo: newDocketData.docket_no,
      };

    }



  } catch (error) {

    if (error instanceof AppError) {
      throw error
    }

    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("Docket No. already exists.", 409);
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
        throw new AppError("Database error while geting party details.", 500);

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
        throw new AppError("Database error while geting party details.", 500);

    }
}