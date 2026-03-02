import mysql from 'mysql2';



let connectionPool;
export const connectToDatabase= async()=> {
    try {
        connectionPool = mysql.createPool({
            host: process.env.HOST,      
            user: process.env.USER,            
            password: process.env.PASSWORD,  
            database: process.env.DB_NAME,
            multipleStatements: true 
        }).promise();

        console.log(`Connected to the MySQL database: ${process.env.DB_NAME} `);  


    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
export const getPool = () => connectionPool;


