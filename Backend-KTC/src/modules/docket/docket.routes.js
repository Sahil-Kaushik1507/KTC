import { Router } from "express";
import {addNewDocket,getNextDocketData,viewAllDockets,viewDocket} from "./docket.controllers.js"
import  {docketValidator, viewDocketValidator} from "./docket.validator.js"
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();


router.route('/new')
    .post(docketValidator, validateRequest, addNewDocket)

router.route('/nextDocketData')
    .post(getNextDocketData)


router.route('/viewAlldocketes')
    .get(viewAllDockets)

router.route('/viewdocket/:docket_no')
    .get(viewDocketValidator,validateRequest, viewDocket)


export default router