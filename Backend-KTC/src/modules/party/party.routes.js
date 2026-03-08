import {Router} from 'express';
import {addNewParty, getPartyDetails,getAllPartyDetails} from './party.controller.js'
import { newPartyValidator } from './party.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/new')
    .post(authentication,authorization("ADMIN","MANAGER","OPERATOR"),newPartyValidator,validateRequest,addNewParty)


router.route('/get/:party_code')
    .get(getPartyDetails)
    
router.route('/get')
    .get(getAllPartyDetails)

export default router;