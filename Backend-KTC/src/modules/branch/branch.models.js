import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";
import { buildInsertQuery } from "../../utils/queryGenrator.js";


// sampledata
// {
//   "branch_name": "Haridwar",
//    "branch_code": "HDR"
//   "address": "SIDCUL Industrial Area, Haridwar, Uttarakhand - 249403",
//   "manager_id":"30 (Optional)" 
// }
export const addBranch = async (newBranchData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { query, values } = buildInsertQuery("BRANCHES",newBranchData)
       const [result]= await connectionPool.query(query, values);
      
        return {
            message: `Branch added successfully`,
            branchId: result.insertId
        };

    } catch (error) {

        // Duplicate entry handling
        if (error.code === "ER_DUP_ENTRY") {

            if (error.sqlMessage.includes("branch_name")) {
                throw new AppError("Branch name already exists.", 409);
            }

            if (error.sqlMessage.includes("manager_id")) {
                throw new AppError("This manager is already assigned to another branch.", 409);
            }

            if (error.sqlMessage.includes("branch_code")) {
                throw new AppError("This Branch Code already used for some other branch", 409);
            }

            throw new AppError("Duplicate entry found.", 409);
        }

        // Foreign key error
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            throw new AppError(
                "Manager does not exist. Please add employee first.",
                400
            );
        }

        console.error("Unexpected DB Error:", error);
        throw new AppError("Database error while adding branch.", 500);
    }
};


// sample Data
// {
//   "branch_id": 1,
//   "manager_id":3
// }

export const addBranchManager = async (managerData) => {

    try {

        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const { branch_id, manager_id } = managerData;

        // Basic validation
        if (!branch_id || !manager_id) {
            throw new AppError("Branch ID and Manager ID are required.", 400);
        }

        const [result] = await connectionPool.query(
            `UPDATE branches 
             SET manager_id = ?
             WHERE branch_id = ?`,
            [manager_id, branch_id]
        );

        // console.log(result)
        //  If branch does not exist
        if (result.affectedRows === 0) {
            throw new AppError("Branch not found.", 404);
        }

        return {
            message: "Manager assigned successfully to the branch."
        };

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        if (error.code === "ER_DUP_ENTRY") {
            if (/manager_id/i.test(error.sqlMessage)) {
                throw new AppError(
                    "This manager is already assigned to another branch.",
                    409
                );
            } else {

                throw new AppError("Duplicate entry found.", 409);
            }

        } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
            throw new AppError(
                "Manager does not exist. Please add employee first.",
                400
            );
        } else {

            console.error("Unexpected DB Error:", error);
            throw new AppError(
                "Database error while assigning manager.",
                500
            );
        }

    }
};


export const viewAllBranches = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM BRANCHES`
        );

        if (result.length === 0) {
            throw new AppError(
                `No Branch found`,
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

// http://localhost:8001/api/v1/branch/viewBranch/:id
export const viewBranchDetails = async (branchId) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }
        const [result] = await connectionPool.query(
            `SELECT * FROM BRANCHES WHERE branch_id = ?`, [branchId]
        );

        if (result.length === 0) {
            throw new AppError(
                `Branch with id '${branchId}' not found`,
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