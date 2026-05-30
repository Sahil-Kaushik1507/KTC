import {Router} from 'express';
import {addNewConsignorParty, getConsignorPartyDetails,getAllConsignorPartyDetails} from './consignorParty.controller.js'
import { newConsignorPartyValidator } from './consignorParty.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/new')
    .post(authentication,authorization("ADMIN","MANAGER","OPERATOR"),newConsignorPartyValidator,validateRequest,addNewConsignorParty)


router.route('/get/:consignor_party_code')
    .get(getConsignorPartyDetails)
    
router.route('/get')
    .get(getAllConsignorPartyDetails)

export default router;