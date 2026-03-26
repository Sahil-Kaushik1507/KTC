import {Router} from 'express';
import {addDocketItems} from './items.controllers.js'
import {itemValidator} from './items.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(itemValidator,validateRequest,addDocketItems)


export default router;