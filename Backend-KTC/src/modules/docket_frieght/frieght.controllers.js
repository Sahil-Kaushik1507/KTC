import asyncHandler from '../../middlewares/asyncHandler.js'
import {addFrieght} from './frieght.models.js'

export const addDocketFrieght = asyncHandler(async(req,res)=>{
 
   const result = await addFrieght(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})

