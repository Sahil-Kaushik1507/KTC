import asyncHandler from '../../middlewares/asyncHandler.js'
import {addEwayBills,getEwayBills} from './ewaybills.models.js'

export const addDocketEwayBills = asyncHandler(async(req,res)=>{
 
   const result = await addEwayBills(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})
export const getDocketEwayBills = asyncHandler(async(req,res)=>{
 
   const result = await getEwayBills(req.params.docket_no)
      res.status(201).json({
        success: true,
        data: result
    })
})

