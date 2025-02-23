import mysql from 'mysql2';
import {DB_NAME} from '../constants.js'


let connectionPool;
export const connectToDatabase= async()=> {
    try {
        connectionPool = mysql.createPool({
            host: process.env.HOST,      
            user: process.env.USER,            
            password: process.env.PASSWORD,  
            database: DB_NAME
        }).promise();

        console.log(`Connected to the MySQL - database. `);  


    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
export const getPool = () => connectionPool;


