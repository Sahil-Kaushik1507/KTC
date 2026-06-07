import { getPool } from "../../config/db.js";
import { withTransaction } from "../../utils/dbTranaction.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";
import { getSequenceWithRowLock,addOneToSequenceWithRowLock } from "../../utils/sequenceManager.js"


//Sample Data
// {
//   "branch_code": "HDW",
//   "ConsigneeParty_name": "Sharma Trading Company",
//   "address": "Plot 45, SIDCUL Industrial Area, Haridwar, Uttarakhand - 249403",
//   "gst_no": "05ABCDE1234F1Z5",
//   "contact_person": "Rohit Sharma",
//   "contact_number": "9876543210"
// }

export const addConsigneeParty = async (consigneePartyData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

            const { query, values } = buildInsertQuery("Consignee_parties",consigneePartyData)

            const [result]= await connectionPool.query(query, values);

            
              return {
            message: `Consignee added successfully`,
            branchId: result.insertId
        };
            
    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        if (error.code === "ER_DUP_ENTRY") {

            if (error.sqlMessage.includes("consignee_party_name")) {
                throw new AppError("ConsigneeParty already exists in this branch", 409);
            }

            if (error.sqlMessage.includes("consignee_gst_no")) {
                throw new AppError("GST number already exists", 409);
            }

            throw new AppError("Duplicate entry found", 409);
        }

        console.error("DB Error:", error);
        throw new AppError("Database error while adding new ConsigneeParty.", 500);

    }
};



export const getAllConsigneeParties = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM consignee_parties`
        );

        if (result.length === 0) {
            throw new AppError(
                `No Consignee Party found`,
                404
            );
        }
  

        return {
            message: `Consignee Parties Found successfully`,
            partiesDetails: result
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        console.error("DB Error:", error);
        throw new AppError("Database error while geting ConsigneeParty details.", 500);

    }
}


export const getBranchWiseConsigneeParties= async (branch_id) => {
    try {

        const connectionPool = getPool();

        if (!connectionPool) {
            throw new AppError(
                "Database connection not initialized.",
                500
            );
        }

        const [result] = await connectionPool.query(
            `
            SELECT * FROM consignee_parties 
            WHERE branch_id = ?
            `,
            [branch_id]
        );

        if (result.length === 0) {
            throw new AppError(
                `No party with branch code:'${branch_id}'`,
                404
            );
        }


        return {
            message: "Consignee Parties Found successfully",
            partyDetails: result
        };

    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        console.error("DB Error:", error);

        throw new AppError(
            "Database error while getting party details.",
            500
        );
    }
};
