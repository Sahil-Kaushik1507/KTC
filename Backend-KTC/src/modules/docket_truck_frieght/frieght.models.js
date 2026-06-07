import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";

// {
//   "docket_no": "HDW-2026-00045",
//   "truck_freight": 28000.00,
//   "company_freight": 32000.00,
//   "multipoint_pickup": 2000.00,
//   "multipoint_delivery": 1500.00,
//   "labour": 3000.00,
//   "holding": 1000.00,
//   "docket_charge": 500.00,
//   "other_charges": 700.00,
//   "subtotal": 40700.00,
//   "other_state_tax": 0.00,
//   "gst": 7326.00,
//   "grand_total": 48026.00,
//   "payment_status": "PENDING"
// }

export const addTruckFrieght = async (newDocketFrieghtData, connection) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { query, values } = buildInsertQuery("truck_freight", newDocketFrieghtData)
        const [result] = connection
            ? await connection.query(query, values)
            : await connectionPool.query(query, values);

        if (result.affectedRows !== 1) {
            throw new AppError("Failed to insert docket Truck Frieghts.", 500);
        }

        return {
            message: `Docket Truck Frieghts Added successfully`,
            frieghtInsertID: result.insertId
        };



    } catch (error) {

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
            throw new AppError("Frieght Already Exists for this Docket", 409);
        }

        console.error("DB Error:", error);
        throw new AppError("Database error while adding Item to Docket.", 500);


    }
}

