import {Router} from 'express';
import {addNewDocket,sendNextDocketNo,viewDocket} from './docket.controllers.js'
const router = Router();

// adding new Docket
router.route("/new")
    .get(sendNextDocketNo)
    .post(addNewDocket);


// viewing dockets
router.route('/view')
    .get(viewDocket);


export default router;