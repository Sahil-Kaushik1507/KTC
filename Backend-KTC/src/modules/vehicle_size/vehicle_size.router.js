import {Router} from 'express';
import {vehicleSizeValidator} from './vehicle_size.validator.js'
import {addVehicleSize,viewSizes} from './vehicle_size.controllers.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(vehicleSizeValidator,validateRequest,addVehicleSize)

router.route('/viewAllSizes')
    .get(viewSizes)    

export default router;