import { getPool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

// http://localhost:8001/api/v1/party-products/:party_code
export const getProducts = async (party_code) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const [partyRows] = await connection.query(
            `SELECT party_id FROM parties WHERE party_code=?`,
            [party_code]
        );

        if (partyRows.length === 0) {
            throw new AppError("Party not found", 404);
        }

        const party_id = partyRows[0].party_id;

        const [result] = await connectionPool.query(
            `SELECT * FROM party_products WHERE party_id=?`,
            [party_id]
        );

        if (result.length === 0) {
            throw new AppError(
                `No Product with party code '${party_code}'`,
                404
            );
        }

        return {
            message: `Products Found successfully`,
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

export const updateProductPriority = async (updateData) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new AppError("Database connection not initialized.", 500);
        }

        const {newPriority,party_code, product_name}=updateData;

        const [partyRows] = await connection.query(
            `SELECT party_id FROM parties WHERE party_code=?`,
            [party_code]
        );

        if (partyRows.length === 0) {
            throw new AppError("Party not found", 404);
        }

        const party_id = partyRows[0].party_id;

        const [result] = await connectionPool.query(
            `UPDATE party_products
                SET priority = ?
                WHERE party_id = ?
                AND product_name = ?;`,
                [newPriority,party_id,product_name]
        );


        return {
            message: `Products Found successfully`,
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