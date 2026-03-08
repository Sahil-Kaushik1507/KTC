
import asyncHandler from '../../middlewares/asyncHandler.js'
import {getProducts,updateProductPriority} from './products.models.js'

export const getPartyProducts = asyncHandler(async(req,res)=>{

   const result = await getProducts(req.params.party_code)
      res.status(201).json({
        success: true,
        data: result
    })
})

export const changePriority = asyncHandler(async(req,res)=>{

   const result = await updateProductPriority(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})
