import {Router} from "express"
import branchRouter from "./modules/branch/branch.routes.js"
import docketRouter from "./modules/docket/docket.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import partyRouter from "./modules/party/party.routes.js"
import sequenceRouter from "./modules/sequenceManager/sequenceManager.routes.js"
import partyProductsRouter from "./modules/party_products/products.routes.js"

const router = Router()

router.use("/branch", branchRouter)
router.use("/docket", docketRouter)
router.use("/auth", authRouter)
router.use("/party", partyRouter)
router.use("/sequence", sequenceRouter)
router.use("/party-products", partyProductsRouter)

export default router