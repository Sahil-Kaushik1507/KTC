import { getPool } from "../index.js";

export const getConsignorDetails = async(ConsignorDetails)=>{
    try{
        const connectionPool = getPool();
        if(!connectionPool){
            throw new Error("Database connection pool is not initialized.");
        }
        const result = await connectionPool.query(
            `SELECT * FROM ConsignorDetails;`,
            ConsignorDetails
        )

        return result;
        


    }catch (error) {
        console.log(`Error in getting Details: ${error}`);
      }
}


/* sample consigneer object
{
  "ConsigneeName": "ABC Logistics",
  "Address": "123 Main Street, Mumbai, India",
  "GST": "27AAACP1234A1Z5",
  "ContactPerson": "Rahul Sharma",
  "ContactNumber": 9876543210,
  "Branch": "Mumbai"
}
*/