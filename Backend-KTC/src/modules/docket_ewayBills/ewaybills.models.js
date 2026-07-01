import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";


// {
//   "docket_no": "DLH-2026-00112",
//   "invoice_no": "INV-7721/2026",
//   "eway_bill_no": "321001234567"
// }


export const addEwayBills = async (newDocketEwayBillsData, connection) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { query, values } = buildInsertQuery("eway_bills", newDocketEwayBillsData)
        const [result] = connection
            ? await connection.query(query, values)
            : await connectionPool.query(query, values);

        if (result.affectedRows !== 1) {
            throw new AppError("Failed to insert docket items.", 500);
        }

        return {
            message: `Eway Bill Added successfully`,
            ewayBillInsertID: result.insertId
        };



    } catch (error) {
 console.log(error)
        if (error instanceof AppError) {
            throw error;
        }

          // Foreign key error
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            throw new AppError(
                "Docket does not exist. Please add Docket first.",
                400
            );
        }

        // Duplicate entry handling
        if (error.code === "ER_DUP_ENTRY") {


            if (error.sqlMessage.includes("uq_docket_invoice")) {
                throw new AppError("Invoice Allready Exists in this Docket", 409);
            }
       
            if (error.sqlMessage.includes("uq_docket_eway")) {
                throw new AppError("Eway bill Allready Exists in this Docket", 409);
            }
            if (error.sqlMessage.includes("uq_invoice_eway")) {
                throw new AppError("Invoice and Eway Bill Combination Allready Exists Please Check!", 409);
            }

          
            throw new AppError("Duplicate entry found.", 409);
        }

      

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding Eway Bill.", 500);
    }

}


export const getEwayBills = async (docket_no) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM eway_bills WHERE docket_no = ?`, [docket_no]
        );

        if (result.length === 0) {
            throw new AppError(
                `Eway Bills with Docket '${docket_no}' not found`,
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
        throw new AppError("Database error while geting party details.", 500);

    }
}