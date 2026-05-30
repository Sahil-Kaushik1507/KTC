import asyncHandler from "../../middlewares/asyncHandler.js";
import { addDocket,viewDockets,viewDocketDetails, getNewDocketData } from "./docket.model.js";


export const addNewDocket = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await addDocket(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const viewAllDockets = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await viewDockets(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})
export const viewDocket = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await viewDocketDetails(req.params.docket_no)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const getNextDocketData = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await getNewDocketData(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})

