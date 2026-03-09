import asyncHandler from "../../middlewares/asyncHandler.js"
import { newVehicleSize, viewAllSizes } from "./vehicle_size.models.js"


export const addVehicleSize = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await newVehicleSize(req.body.size_name)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const viewSizes = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await viewAllSizes()
    res.status(200).json({
        success: true,
        data: result
    })

})