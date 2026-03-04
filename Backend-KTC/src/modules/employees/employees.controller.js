import asyncHandler from "../../middlewares/asyncHandler.js";
import {addEmployee} from './employees.model.js'

export const addNewEmployee = asyncHandler(async(req,res)=>{
    const result = await addEmployee(req.body)
      res.status(201).json({
        success: true,
        data: result
    })
})