import { Router } from "express";
import {addNewSequence, getNextNumber} from "./sequenceManager.controller.js"
import  {newSequenceValidator, getNextNumberValidator} from "./sequenceManager.validator.js"
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router.route('/addNewSequence')
    .post(newSequenceValidator, validateRequest, addNewSequence)

router.route('/getNextNumber')
    .patch(getNextNumberValidator, validateRequest, getNextNumber)

export default router;