import asyncHandler from "../../middlewares/asyncHandler.js";
import {addUser,loginUser,updateUser,changeUserPassword,deactivateUserReq} from './auth.models.js'

export const registerNewUser = asyncHandler(async(req,res)=>{
    const result = await addUser(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
});



export const userLogin = asyncHandler (async (req,res)=>{

    const result = await loginUser(req.body)

     res.status(200).json({
        success: true,
        data: result
    })
})


export const updateUserDetails = asyncHandler(async(req,res)=>{
      //  const { user_id } = req.params;
    //  console.log(user_id)
    const result = await updateUser(req.body,req.user.user_id)

    res.status(201).json({
      success: true,
      data: result
    })
})

export const changePassword = asyncHandler(async(req,res)=>{
      //  const { user_id } = req.params;
    //  console.log(user_id)
    const result = await changeUserPassword(req.body,req.user.user_id)

    res.status(201).json({
      success: true,
      data: result
    })
})


export const deactivateUser = asyncHandler(async(req,res)=>{

  const {user_id}= req.params
  const result= await deactivateUserReq(user_id)
   res.status(201).json({
      success: true,
      data: result
    })

})