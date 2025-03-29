import {getPool} from '../index.js'

// get all dockets in the table
export const getAllDockets = async () => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new Error('Database connection pool is not initialized.');
        }
        const [allDockets] = await connectionPool.query("SELECT * FROM DOCKET");
        return allDockets;
    } catch (error) {
        console.error('Error fetching dockets:', error);
        throw error;
    }

};


//get single docket with its docket number
export const getDocket = async (DocketNo) => {
    try {
        const connectionPool = getPool();
        if (!connectionPool) {
            throw new Error('Database connection pool is not initialized.');
        }
        const [Docket] = await connectionPool.query(`SELECT * FROM DOCKET WHERE DocketNo=?`,[DocketNo]);
        if(Docket.length===0){
            return`Docket Number:${DocketNo} does not exist.`
        }
        return Docket;
    } catch (error) {
        console.error('Error fetching dockets:', error);
        throw error;
    }

};

