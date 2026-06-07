import asyncHandler from '../../middlewares/asyncHandler.js'
import {addRate, getRate} from './rates.models.js'

export const addNewRate = asyncHandler(async(req,res)=>{

   const result = await addRate(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})


export const getRateDetails = asyncHandler(async(req,res)=>{

   const result = await getRate(req.query)
      res.status(201).json({
        success: true,
        data: result
    })
})

// export const changePriority = asyncHandler(async(req,res)=>{

//    const result = await updateProductPriority(req.body)
//       res.status(201).json({
//         success: true,
//         data: result
//     })
// })
