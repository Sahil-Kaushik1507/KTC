import { getPool } from "../config/db.js";

export const withTransaction = async (callback) => {

    const pool = getPool();
    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const result = await callback(connection);

        await connection.commit();

        return result;

    } catch (error) {

        await connection.rollback();
        throw error;   

    } finally {

        connection.release();

    }
};