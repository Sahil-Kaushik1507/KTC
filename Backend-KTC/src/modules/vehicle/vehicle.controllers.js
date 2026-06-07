import asyncHandler from "../../middlewares/asyncHandler.js"
import { addNewVehicle,viewVehicles,getVehicleByNo } from "./vehicle.models.js"


export const addVehicle = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await addNewVehicle(req.body)
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
export const getTruckDetails = asyncHandler(async (req, res) => {
    // console.log(req.query)
    const result = await getVehicleByNo(req.query.truck_no)
    res.status(200).json({
        success: true,
        data: result
    })

})