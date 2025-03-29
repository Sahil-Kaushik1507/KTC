import { getPool } from "../index.js";

export const addConsignorDetails = async(newConsignorDetails)=>{
    try{
        const connectionPool = getPool();
        if(!connectionPool){
            throw new Error("Database connection pool is not initialized.");
        }
        const result = await connectionPool.query(
            `INSERT INTO ConsignorDetails (ConsigneeName,Address,GST,ContactPerson,ContactNumber,Branch) 
            VALUES (?,?,?,?,?,?);`,
            newConsignorDetails
        )

        if(result[0].affectedRows === 1){
            return `Consignor: ${newConsignorDetails[0]} Added Succesfully!!`;
        }
        return "Failed :Row Affected is not one";
        


    }catch (error) {
        console.log(`Docket Not Added: ${error}`);
      }
}


/* sample docket object
{
  "ConsigneeName": "ABC Logistics",
  "Address": "123 Main Street, Mumbai, India",
  "GST": "27AAACP1234A1Z5",
  "ContactPerson": "Rahul Sharma",
  "ContactNumber": 9876543210,
  "Branch": "Mumbai"
}
*/