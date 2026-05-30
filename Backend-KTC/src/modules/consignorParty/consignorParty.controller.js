import asyncHandler from "../../middlewares/asyncHandler.js";
import {addConsignorParty, getConsignorParty,getAllConsignorParties,getBranchWiseConsignorPartiesWithProducts } from './consignorParty.model.js'

export const addNewConsignorParty = asyncHandler(async(req,res)=>{
    const result = await addConsignorParty(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
});

export const getConsignorPartyDetails = asyncHandler(async(req,res)=>{
   const result = await getConsignorParty(req.params.party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})

export const getAllConsignorPartyDetails = asyncHandler(async(req,res)=>{

   const result = await getAllConsignorParties(req.params.party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})