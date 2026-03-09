import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";


// sampledata
// {
//   " size_name": "22FT.
// }
export const newVehicleSize = async (size_name) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        let [result] = await connectionPool.query(
            `INSERT INTO vehicle_sizes 
                 (size_name) 
                 VALUES (?)`,
            [size_name]
        );


        console.log(result)
        return {
            message: `New Size added successfully`,
            insertID: result.insertId
        };

    } catch (error) {

        // Duplicate entry handling
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError("Duplicate vehicle size", 409);
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);
    }
};


export const viewAllSizes = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM vehicle_sizes ORDER BY size_id`
        );

        if (result.length === 0) {
            throw new AppError(
                `No Size found`,
                404
            );
        }
        console.log(result)
        return result;
    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        console.error("DB Error:", error);
        throw new AppError("Database error while geting party details.", 500);

    }
}