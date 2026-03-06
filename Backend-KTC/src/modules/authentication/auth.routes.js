import {Router} from 'express'
import {registerNewUser, userLogin, updateUserDetails, changePassword, deactivateUser} from './auth.controller.js'
import { registerValidator,loginValidator,updateUserValidator,newPasswordValidator } from './auth.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { authentication } from '../../middlewares/authentication.js';
import { authorization } from '../../middlewares/authorization.js';

const router = Router();


router.route('/register')
    .get()
    .post(registerValidator,validateRequest, registerNewUser)

router.route('/login')
    .get()
    .post(loginValidator,validateRequest,userLogin)

router.route('/updateUserDetails')
    .patch(authentication,authorization("ADMIN","MANAGER"),updateUserValidator,validateRequest,updateUserDetails)

router.route('/changePassword')
    .patch(authentication,newPasswordValidator,validateRequest,changePassword)

router.route('/:user_id/deactivateUser')
    .patch(authentication,authorization("ADMIN","MANAGER"),deactivateUser)

export default router;