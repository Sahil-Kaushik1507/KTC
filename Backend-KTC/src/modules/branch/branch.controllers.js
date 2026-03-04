import asyncHandler from "../../middlewares/asyncHandler.js"
import { addBranch,addBranchManager, viewAllBranches,viewBranchDetails } from "./branch.model.js"


export const addNewBranch = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const result = await addBranch(req.body)
    res.status(201).json({
        success: true,
        data: result
    })

})

export const addManager = asyncHandler(async(req,res)=>{

    const result = await addBranchManager(req.body)

      res.status(201).json({
        success: true,
        data: result
    })
})




export const viewBranches = asyncHandler(async (req, res) => {

    const branches = await viewAllBranches();

    res.status(200).json({
        success: true,
        count: branches.length,
        data: branches
    });

});

export const viewBranch = asyncHandler(async (req, res) => {

    const branchDetails = await viewBranchDetails(req.params.branch_id);

    res.status(200).json({
        success: true,
        data: branchDetails
    });

});