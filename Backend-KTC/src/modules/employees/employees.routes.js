import {Router} from 'express'
import {addNewEmployee} from './employees.controller.js'
import { employeeValidator } from './employees.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.js';

const router = Router();


router.route('/new')
    .get()
    .post(employeeValidator,validateRequest, addNewEmployee)



export default router;