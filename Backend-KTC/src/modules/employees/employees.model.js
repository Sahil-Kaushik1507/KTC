import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

//Sample Data
// {
//   "employee_name": "Dheeraj Verma",
//   "phone_no": "8123453470",
//   "email": "dheerj.v@ktc.com",
//   "date_of_joining": "2025-01-10",
//   "branch_id": 1,
//   "salary": 28000.00,
//   "role": "ACCOUNTANT"
// }

export const addEmployee = async (employeeData) => {

    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const { employee_name, phone_no, email, date_of_joining, branch_id, salary, role } = employeeData;

        const [result] = await connectionPool.query(
            `INSERT INTO EMPLOYEES 
            (employee_name,phone_no,email,date_of_joining,branch_id,salary,role) 
            VALUES (?,?,?,?,?,?,?)`,
            [employee_name, phone_no, email, date_of_joining, branch_id, salary, role])

            // console.log(result)
        return {
            message: `Employee added successfully`,
            employeeId: result.insertId
        };

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            if (error.sqlMessage.includes("phone_no")) {
                throw new AppError("Phone No. already used by some other employee", 409);
            }
            if (error.sqlMessage.includes("email")) {
                throw new AppError("Email already used by some other employee", 409);
            }
            throw new AppError("Duplicate entry found.", 409);
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);

    }

}