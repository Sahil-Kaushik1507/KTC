import {Router} from 'express';
import {addNewParty} from './party.controller.js'
import { newPartyValidator } from './party.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/new')
    .post(authentication,authorization("ADMIN","MANAGER"),newPartyValidator,validateRequest,addNewParty)


export default router;