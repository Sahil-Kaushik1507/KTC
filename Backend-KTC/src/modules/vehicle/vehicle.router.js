import {Router} from 'express';
import {vehicleValidator} from './vehicle.validator.js'
import {addVehicle,viewAllVehicles,getTruckDetails} from './vehicle.controllers.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(vehicleValidator,validateRequest,addVehicle)

router.route('/viewAllVehicles')
    .get(viewAllVehicles)   

router.route('/getTruckDetails')
    .get(getTruckDetails)    

export default router;