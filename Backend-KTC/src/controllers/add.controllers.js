import asyncHandler from "../utils/asynHandler.js";
import{addConsignorDetails} from "../db/Add/set.consignorDetails.js"

export const addNewConsignor = asyncHandler(async(req,res)=>{
    try {
      console.log(Object.values(req.body))
     const response = addConsignorDetails(Object.values(req.body));
         res.send(response);
       } catch (error) {
         console.log(error);
       }

})