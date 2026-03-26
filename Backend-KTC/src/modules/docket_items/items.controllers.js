import asyncHandler from '../../middlewares/asyncHandler.js'
import {addItems} from './items.models.js'

export const addDocketItems = asyncHandler(async(req,res)=>{
 
   const result = await addItems(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})

