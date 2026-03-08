import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";


// sampledata
// {
//   " sequence_name": "PTY",
//    "next_number": "25"
// }
export const addSequence = async (sequenceData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { sequence_name, next_number } = sequenceData;

        let [result] = await connectionPool.query(
            `INSERT INTO sequence_master 
                 (sequence_name, next_number) 
                 VALUES (?,?)`,
            [sequence_name, next_number]
        );

        // console.log(result)
        return {
            message: `New Sequence added successfully`
        };

    } catch (error) {

        // Duplicate entry handling
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError("Duplicate Sequance Name", 409);
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);
    }
};

// sampledata
// {
//   " sequence_name": "PTY",
// }
export const getNextAvailableNumber = async (sequence_name) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        let [result] = await connectionPool.query(
            `SELECT next_number FROM sequence_master
                WHERE sequence_name = ?`,
            [sequence_name]
        );

        if (result.length === 0) {
            throw new AppError(`Sequence '${sequence_name}' not found.`, 404);
        }

        return {
            message: `Next Sequence Number for '${sequence_name}' `,
            next_number: result[0].next_number
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);
    }
};
