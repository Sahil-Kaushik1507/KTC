import { getPool } from "../index.js";


export const getBranchDetails = async(BranchDetails)=>{
    try{
        const connectionPool = getPool();
        if(!connectionPool){
            throw new Error("Database connection pool is not initialized.");
        }
        const result = await connectionPool.query(
            `SELECT * FROM Branch;`,
            BranchDetails
        )

        return result;
        


    }catch (error) {
        console.log(`Error in getting Details: ${error}`);
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