import {Router} from 'express';
import {getPartyProducts,changePriority} from './products.controllers.js'
import {partyIdValidator} from './products.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/:party_id')
    .post(authentication,authorization("ADMIN","MANAGER","OPERATOR"),partyIdValidator,validateRequest,getPartyProducts)

router.route('priority')
    .patch(changePriority)

export default router;