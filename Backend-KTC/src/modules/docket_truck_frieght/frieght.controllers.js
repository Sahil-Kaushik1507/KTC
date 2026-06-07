import asyncHandler from '../../middlewares/asyncHandler.js'
import {addTruckFrieght} from './frieght.models.js'

export const addDocketFrieght = asyncHandler(async(req,res)=>{
 
   const result = await addTruckFrieght(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})

