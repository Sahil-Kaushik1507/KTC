import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";

// {
//   "docket_no": "HDR-2026-000001",
//   "product_name": "TMT Steel Bars",
//   "total_packages": 120,
//   "packaging_method": "Bundles",
//   "declared_value": 450000.00
// }

export const addItems = async (newDocketItemsData, connection) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { query, values } = buildInsertQuery("docket_items", newDocketItemsData)
        const [result] = connection
            ? await connection.query(query, values)
            : await connectionPool.query(query, values);

        if (result.affectedRows !== 1) {
            throw new AppError("Failed to insert docket items.", 500);
        }

        return {
            message: `Docket Items Added successfully`,
            itemInsertID: result.insertId
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

            if (error.sqlMessage.includes("uq_docket_product")) {
                throw new AppError("Item Allready Exists in this Docket", 409);
            }
          
            throw new AppError("Duplicate entry found.", 409);
        }

        console.error("DB Error:", error);
        throw new AppError("Database error while adding Item to Docket.", 500);


    }
}

