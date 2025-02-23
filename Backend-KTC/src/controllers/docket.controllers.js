import asyncHandler from "../utils/asynHandler.js";
import {addDocket} from '../db/set.dockets.js'



export const addNewDocket= asyncHandler(async (req,res)=>{
    // console.log();
    const response=addDocket(Object.values(req.body))
    res.send(response); 
})