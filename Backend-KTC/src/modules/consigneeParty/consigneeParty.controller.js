import asyncHandler from "../../middlewares/asyncHandler.js";
import {addConsigneeParty, getAllConsigneeParties} from './consigneeParty.model.js'

export const addNewConsigneeParty = asyncHandler(async(req,res)=>{
    const result = await addConsigneeParty(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
});



export const getAllConsigneePartyDetails = asyncHandler(async(req,res)=>{

   const result = await getAllConsigneeParties(req.params.Consignee_Party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})