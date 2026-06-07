import {Router} from 'express';
import {addDocketFrieght} from './frieght.controllers.js'
import {frieghtValidator} from './frieght.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/addnew')
    .post(frieghtValidator,validateRequest,addDocketFrieght)


export default router;