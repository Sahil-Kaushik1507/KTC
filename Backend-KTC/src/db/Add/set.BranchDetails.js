import { getPool } from "../index.js";

export const addBranchDetails = async(newBranchDetails)=>{
    try{
        const connectionPool = getPool();
        if(!connectionPool){
            throw new Error("Database connection pool is not initialized.");
        }
        const result = await connectionPool.query(
            `INSERT INTO Branch 
            (BranchID,BranchName, Address, BranchManager, ManagerContactNumber) 
            VALUES 
            VALUES (?,?,?,?,?);`,
            newBranchDetails
        )

        if(result[0].affectedRows === 1){
            return `Branch: ${newBranchDetails[0]} Added Succesfully!!`;
        }
        return "Failed :Row Affected is not one";
        


    }catch (error) {
        console.log(`Branch Not Added: ${error}`);
      }
}


/* sample docket object
{
  "BranchID": "UK01",
  "BranchName": "Haridwar",
  "Address": "Goel Rice Meal Bhadrabad Haridwar (UK)",
  "BranchManager": "Jasbir Kaushik",
  "ManagerContactNumber": "8077958775"
}
*/