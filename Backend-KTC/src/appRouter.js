import {Router} from "express"
import branchRouter from "./modules/branch/branch.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import partyRouter from "./modules/party/party.routes.js"
import sequenceRouter from "./modules/sequenceManager/sequenceManager.routes.js"
import partyProductsRouter from "./modules/party_products/products.routes.js"
import vehicleSizeRouter from "./modules/vehicle_size/vehicle_size.router.js"
import vehicleRouter from "./modules/vehicle/vehicle.router.js"
import ratesRouter from "./modules/rates/rates.routes.js"
import docketRouter from "./modules/docket/docket.routes.js"

const router = Router()

router.use("/branch", branchRouter)
router.use("/auth", authRouter)
router.use("/party", partyRouter)
router.use("/sequence", sequenceRouter)
router.use("/party-products", partyProductsRouter)
router.use("/vehicle-size", vehicleSizeRouter)
router.use("/vehicle", vehicleRouter)
router.use("/rates", ratesRouter)
router.use("/docket", docketRouter)

export default router