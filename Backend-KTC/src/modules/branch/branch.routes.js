import { Router } from "express";
import {addNewBranch, addManager,viewBranches,viewBranch} from "./branch.controllers.js"
import  {branchManagerValidator, branchValidator, viewBranchValidator} from "./branch.validator.js"
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router.route('/new')
    .get()
    .post(branchValidator, validateRequest, addNewBranch)


router.route('/addManager')
    .get()
    .post(branchManagerValidator,validateRequest, addManager)

router.route('/viewAllBranches')
    .get(viewBranches)
    .post()

router.route('/viewBranch/:branch_id')
    .get(viewBranchValidator,validateRequest, viewBranch)
    .post()

export default router