import {Router} from 'express';
import {addNewConsigneeParty,getAllConsigneePartyDetails} from './consigneeParty.controller.js'
import { newConsigneePartyValidator } from './consigneeParty.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/new')
    .post(authentication,authorization("ADMIN","MANAGER","OPERATOR"),newConsigneePartyValidator,validateRequest,addNewConsigneeParty)


    
router.route('/get')
    .get(getAllConsigneePartyDetails)

export default router;