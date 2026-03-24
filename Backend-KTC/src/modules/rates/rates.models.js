import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js"


// sampledata
// {
//   "party_name": "Halonix Pvt Ltd" ,
//   "source": "Haridwar",
//   "destination": "Delhi",
//   "size_name": "22FT",
//   "freight": 32000.00
// }

export const addRate = async (newRateData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        // console.log(newVehicleData)
        const { size_name, party_name } = newRateData;

        const [rows_size] = await connectionPool.query(
            `SELECT size_id FROM vehicle_sizes WHERE size_name = ?`,
            [size_name]
        );

        if (rows_size.length === 0) {
            throw new AppError(
                "Size does not exist. Please add Size first.",
                400
            );
        }

        const size_id = rows_size[0].size_id;
        // delete newRateData["size_name"]
        // newRateData.size_id = size_id;

        const [rows_party] = await connectionPool.query(
            `SELECT party_id FROM parties WHERE party_name = ?`,
            [party_name]
        );

        if (rows_party.length === 0) {
            throw new AppError(
                "Party does not exist. Please add Party first.",
                400
            );
        }


        const party_id = rows_party[0].party_id;

        // delete newRateData["party_name"]
        // newRateData.party_id = party_id;

        const {source, destination,freight}=newRateData;
       
        const [result] = await connectionPool.query(` INSERT INTO rate_master 
                 (party_id, source, destination, size_id, freight)
                    VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    freight = VALUES(freight)`,[party_id,source,destination,size_id,freight]);

        return {
            message: result.affectedRows === 1
                ? "Rate added successfully"
                : "Rate updated successfully"
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error
        }

        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError("Rate already Exists for this Party for this source, Destination and Size", 409);
        }



        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding Rate.", 500);
    }
};

