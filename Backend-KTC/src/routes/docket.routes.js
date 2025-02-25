import {Router} from 'express';
import {addNewDocket,sendNextDocketNo} from '../controllers/docket.controllers.js'
const router = Router();


router.route("/new").post(addNewDocket)
router.route("/new/company").get(sendNextDocketNo)




router.route('/*').get((req,res)=>{
    res.send("in api/v1/docket/new")
})



export default router;