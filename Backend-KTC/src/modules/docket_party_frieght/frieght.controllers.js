import asyncHandler from '../../middlewares/asyncHandler.js'
import {addPartyFrieght} from './frieght.models.js'

export const addDocketFrieght = asyncHandler(async(req,res)=>{
 
   const result = await addPartyFrieght(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})

