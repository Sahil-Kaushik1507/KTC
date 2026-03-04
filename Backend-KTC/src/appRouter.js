import {Router} from "express"
import branchRouter from "./modules/branch/branch.routes.js"
import docketRouter from "./modules/docket/docket.routes.js"
import employeesRouter from "./modules/employees/employees.routes.js"

const router = Router()

router.use("/branch", branchRouter)
router.use("/docket", docketRouter)
router.use("/employees", employeesRouter)

export default router