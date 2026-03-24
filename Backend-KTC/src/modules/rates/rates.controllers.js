import asyncHandler from '../../middlewares/asyncHandler.js'
import {addRate} from './rates.models.js'

export const addNewRate = asyncHandler(async(req,res)=>{

   const result = await addRate(req.body)
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
