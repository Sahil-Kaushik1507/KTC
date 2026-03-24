import {Router} from 'express';
import {addNewRate} from './rates.controllers.js'
import {newRateValidator} from './rates.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(newRateValidator,validateRequest,addNewRate)

// router.patch("/updaterate")
//     .patch(updateValidator,validateRequest,updateRate)

export default router;
