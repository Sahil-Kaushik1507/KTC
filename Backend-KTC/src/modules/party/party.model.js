import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";


//Sample Data
// {
//   "user_name": "Dheeraj Verma",
//   "phone_no": "8123453470",
//   "email": "dheerj.v@ktc.com",
//   "date_of_joining": "2025-01-10",
//   "branch_id": 1,
//   "salary": 28000.00,
//   "role": "ACCOUNTANT"
// }

export const addParty = async (partyData) => {

    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const { branch_id, party_name, address, gst_no, contact_person, contact_number } = partyData;

        const [result] = await connectionPool.query(
            `INSERT INTO PARTIES 
                (branch_id, party_name, address, gst_no, contact_person, contact_number) 
                VALUES (?,?,?,?,?,?)`,
            [branch_id, party_name, address, gst_no, contact_person, contact_number])

        // console.log(result)
        return {
            message: `Party added successfully`,
            partyId: result.insertId
        };

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {

            if (error.sqlMessage.includes("party_name")) {
                throw new AppError("Party already exists in this branch", 409);
            }
            if (error.sqlMessage.includes("gst_no")) {
                throw new AppError("GST number already exists", 409);
            }


            throw new AppError("Duplicate entry found", 409);
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            throw new AppError("Branch_id Not Found", 404)
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding new party.", 500);

    }

}