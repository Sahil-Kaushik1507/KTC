import {Router} from "express"
import branchRouter from "./modules/branch/branch.routes.js"
import docketRouter from "./modules/docket/docket.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import partyRouter from "./modules/party/party.routes.js"

const router = Router()

router.use("/branch", branchRouter)
router.use("/docket", docketRouter)
router.use("/auth", authRouter)
router.use("/party", partyRouter)

export default router