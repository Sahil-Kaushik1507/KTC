import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

export const addUser = async (userData) => {

    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const { user_name, phone_no, email, password, date_of_joining, branch_id, salary, role } = userData;

        const password_hash = await bcrypt.hash(password, 10)

        const [result] = await connectionPool.query(
            `INSERT INTO USERS 
            (user_name,phone_no,email,date_of_joining,branch_id,salary,role) 
            VALUES (?,?,?,?,?,?,?,?)`,
            [user_name, phone_no, email, password_hash, date_of_joining, branch_id, salary, role])

        // console.log(result)
        return {
            message: `user added successfully`,
            userId: result.insertId
        };

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            if (error.sqlMessage.includes("phone_no")) {
                throw new AppError("Phone No. already used by some other user", 409);
            }
            if (error.sqlMessage.includes("email")) {
                throw new AppError("Email already used by some other user", 409);
            }
            throw new AppError("Duplicate entry found.", 409);
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding new user.", 500);

    }

}

//Sample Data 
// {
//   "email": "ramesh@ktc.com",
//  "password":"Password@123"
// }
export const loginUser = async (userData) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { email, password } = userData

        const [result] = await connectionPool.query(`
            SELECT user_id,email,password_hash,role,is_active FROM userS
            WHERE email=?`, [email])



        let passwordCheck = false;
        if (result[0]) {
            if (!result[0].is_active) {
                throw new AppError("Sorry! You are not a Active User anymore!")
            }
            passwordCheck = await bcrypt.compare(password, result[0].password_hash)

        } else {
            throw new AppError("Email Not Registered", 401)
        }

        if (passwordCheck) {
            const { user_id, email, role } = result[0]
            const payload = { user_id, email, role }
            const newtoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

            return {
                message: `Login Successfull`,
                token: newtoken
            };
        } else {
            throw new AppError("Worng Password", 401)
        }

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while checking.", 500);

    }
}


//sample data
// {
//     email:"newemail" any one field to update
// }
export const updateUser = async (userData, user_id) => {
    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const field = Object.keys(userData)
        const value = Object.values(userData)
        const allowedFields = ["phone_no", "email", "branch_id", "salary", "role"];
        if (field.length > 1) {
            throw new AppError("Update One Field at a time!")
        }
        console.log(field)
        if (!allowedFields.includes(field[0])) {
            throw new AppError("Invalid field name to Update", 400)
        }

        const query = `UPDATE USERS SET ${field[0]} = ? where user_id = ?`
        const result = await connectionPool.query(query, [value[0], user_id])
        if (result[0].affectedRows < 1) {
            throw new AppError("User Not Found", 500)
        }
        return {
            message: `user updated successfully`,
        };


    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

    }
}

// sample data 
// {
//   "old_password":"Password@123",
//   "new_password":"Password@1234"
// }
export const changeUserPassword = async (passwordData, user_id) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { old_password, new_password } = passwordData

        const [result] = await connectionPool.query(`SELECT password_hash FROM USERS WHERE user_id =?`, [user_id])
        console.log(result)
        let passwordCheck = false;
        if (result[0]) {
            passwordCheck = await bcrypt.compare(old_password, result[0].password_hash)
        } else {
            throw new AppError("User Not Registered", 401)
        }
        console.log("changing pass")

        if (!passwordCheck) {
            throw new AppError("Old Password do not Match")
        }

        const newPassword_hash = await bcrypt.hash(new_password, 10)
        await connectionPool.query(`UPDATE USERS SET password_hash = ? WHERE user_id =?`, [newPassword_hash, user_id])

        return {
            message: `Password updated successfully`,
        };


    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

    }
}



export const deactivateUserReq = async (user_id) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const result = await connectionPool.query(`UPDATE USERS 
         SET is_active = false,
             date_of_leaving = CURDATE()
         WHERE user_id = ?`,
            [user_id])

        if (result[0].affectedRows < 1) {
            throw new AppError("No such user Found", 404)
        }
        return {
            message: `user deleated successfully`,
        };

    } catch (error) {

          if (error instanceof AppError) {
            throw error;
        }

}
}