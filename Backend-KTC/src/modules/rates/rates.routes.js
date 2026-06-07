import {Router} from 'express';
import {addNewRate, getRateDetails} from './rates.controllers.js'
import {newRateValidator} from './rates.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(newRateValidator,validateRequest,addNewRate)


router.route('/getRateDetails')
    .get(getRateDetails)

// router.patch("/updaterate")
//     .patch(updateValidator,validateRequest,updateRate)

export default router;
