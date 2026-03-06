import asyncHandler from "../../middlewares/asyncHandler.js";
import {addParty} from './party.model.js'

export const addNewParty = asyncHandler(async(req,res)=>{
    const result = await addParty(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
});

