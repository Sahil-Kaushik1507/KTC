import asyncHandler from "../../middlewares/asyncHandler.js"
import { newVehicle,viewVehicles} from "./vehicle.models.js"


export const addVehicle = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await newVehicle(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const viewAllVehicles = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await viewVehicles()
    res.status(200).json({
        success: true,
        data: result
    })

})