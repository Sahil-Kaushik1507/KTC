import asyncHandler from "../../middlewares/asyncHandler.js";
import {addParty, getParty,getAllParties} from './party.model.js'

export const addNewParty = asyncHandler(async(req,res)=>{
    const result = await addParty(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
});

export const getPartyDetails = asyncHandler(async(req,res)=>{

  
   const result = await getParty(req.params.party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})

export const getAllPartyDetails = asyncHandler(async(req,res)=>{

   const result = await getAllParties(req.params.party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})