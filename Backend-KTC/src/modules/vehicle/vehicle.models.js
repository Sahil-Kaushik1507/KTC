import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js"


// sampledata
// {
//   " size_name": "22FT.
// }

export const newVehicle = async (newVehicleData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        // console.log(newVehicleData)
        const { size_name } = newVehicleData;

        const [rows] = await connectionPool.query(
            `SELECT size_id FROM vehicle_sizes WHERE size_name = ?`,
            [size_name]
        );

        // check if no record found
        if (rows.length === 0) {
            throw new AppError(
                "Size does not exist. Please add Size first.",
                400
            );
        }

        // access actual size_id if needed
        const size_id = rows[0].size_id;

        // console.log(size_id);

        delete newVehicleData["size_name"]

        newVehicleData.size_id = size_id;

        const { query, values } = buildInsertQuery("VEHICLES", newVehicleData)
        console.log(query)
        const [result] = await connectionPool.query(query, values);

        return {
            message: `Vehicles added successfully`,
            vehicleId: result.insertId
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error
        }

        // Duplicate entry handling
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError("Lorry already Exists", 409);
        }


        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);
    }
};

export const viewVehicles = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM vehicles ORDER BY lorry_no`
        );

        if (result.length === 0) {
            throw new AppError(
                `No vehicle found`,
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