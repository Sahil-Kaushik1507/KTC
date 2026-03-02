import {Router} from 'express';
import { addNewConsignor } from '../controllers/add.controllers.js';

const router = Router();


router.route('/ConsignorDetails').post(addNewConsignor)


export default router;