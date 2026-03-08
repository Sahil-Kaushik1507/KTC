import { getPool } from "../../config/db.js";
import { withTransaction } from "../../utils/dbTranaction.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";


//Sample Data
// {
//   "branch_code": "HDW",
//   "party_name": "Sharma Trading Company",
//   "address": "Plot 45, SIDCUL Industrial Area, Haridwar, Uttarakhand - 249403",
//   "gst_no": "05ABCDE1234F1Z5",
//   "contact_person": "Rohit Sharma",
//   "contact_number": "9876543210"
// }

export const addParty = async (partyData) => {

    try {

        return await withTransaction(async (connection) => {

            const { branch_code } = partyData;

            const party_sequence_name = "PTY_" + branch_code;

            const [branchRows] = await connection.query(
                `SELECT branch_id FROM branches WHERE branch_code=?`,
                [branch_code]
            );

            if (branchRows.length === 0) {
                throw new AppError("Branch not found", 404);
            }

            const branch_id = branchRows[0].branch_id;


            const [seqRows] = await connection.query(
                `SELECT next_number
                 FROM sequence_master
                 WHERE sequence_name = ?
                 FOR UPDATE`,
                [party_sequence_name]
            );

            if (seqRows.length === 0) {
                throw new AppError(
                    `Sequence ${party_sequence_name} not found`,
                    404
                );
            }

            const next_number = seqRows[0].next_number;

            const party_code =
                `${party_sequence_name}_${next_number.toString().padStart(4, "0")}`;

            partyData.branch_id = branch_id;
            partyData.party_code = party_code;

            delete partyData.branch_code;
            const { query, values } = buildInsertQuery("PARTIES",partyData)

            const [result]= await connection.query(query, values);

            // const [result] = await connection.query(
            //     `INSERT INTO PARTIES
            //     (branch_id, party_name, party_code, address, gst_no, contact_person, contact_number)
            //     VALUES (?,?,?,?,?,?,?)`,
            //     [branch_id, party_name, party_code, address, gst_no, contact_person, contact_number]
            // );


            await connection.query(
                `UPDATE sequence_master
                 SET next_number = next_number + 1
                 WHERE sequence_name = ?`,
                [party_sequence_name]
            );

            return {
                message: "Party added successfully",
                partyId: result.insertId,
                partyCode: party_code
            };

        });

    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        if (error.code === "ER_DUP_ENTRY") {

            if (error.sqlMessage.includes("party_name")) {
                throw new AppError("Party already exists in this branch", 409);
            }

            if (error.sqlMessage.includes("gst_no")) {
                throw new AppError("GST number already exists", 409);
            }

            throw new AppError("Duplicate entry found", 409);
        }

        console.error("DB Error:", error);
        throw new AppError("Database error while adding new party.", 500);

    }
};


// http://localhost:8001/api/v1/getPartyDetails/:party_code
export const getParty = async (party_code) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const [result] = await connectionPool.query(
            `SELECT * FROM parties WHERE party_code=?`,
            [party_code]
        );

        if (result.length === 0) {
            throw new AppError(
                `Party with code '${party_code}' not found`,
                404
            );
        }

        return {
            message: `Party Found successfully`,
            partyDetails: result
        };



    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        console.error("DB Error:", error);
        throw new AppError("Database error while geting party details.", 500);


    }
}

export const getAllParties = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM parties`
        );

        if (result.length === 0) {
            throw new AppError(
                `No Party found`,
                404
            );
        }
        console.log(result)

        return {
            message: `Parties Found successfully`,
            partiesDetails: result
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        console.error("DB Error:", error);
        throw new AppError("Database error while geting party details.", 500);

    }
}


