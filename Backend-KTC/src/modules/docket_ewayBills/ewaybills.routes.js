import {Router} from 'express';
import {addDocketEwayBills,getDocketEwayBills} from './ewaybills.controllers.js'
import {ewayBillsValidator,getEwayBillsValidator} from './ewaybills.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(ewayBillsValidator,validateRequest,addDocketEwayBills)

router.route('/view/:docket_no')
    .get(getEwayBillsValidator,validateRequest,getDocketEwayBills)

export default router;