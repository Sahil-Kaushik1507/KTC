import asyncHandler from "../../middlewares/asyncHandler.js"
import { addSequence,getNextAvailableNumber } from "./sequenceManager.models.js"


export const addNewSequence = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await addSequence(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const getNextNumber = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await getNextAvailableNumber(req.body.sequence_name)
    res.status(201).json({
        success: true,
        data: result
    })

})
