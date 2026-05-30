import {Router} from "express"
import branchRouter from "./modules/branch/branch.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import consignorPartyRouter from "./modules/consignorParty/consignorParty.routes.js"
import consigneePartyRouter from "./modules/consigneeParty/consigneeParty.routes.js"
import sequenceRouter from "./modules/sequenceManager/sequenceManager.routes.js"
import partyProductsRouter from "./modules/party_products/products.routes.js"
import vehicleSizeRouter from "./modules/vehicle_size/vehicle_size.router.js"
import vehicleRouter from "./modules/vehicle/vehicle.router.js"
import ratesRouter from "./modules/rates/rates.routes.js"
import docketRouter from "./modules/docket/docket.routes.js"
import docketItemRouter from "./modules/docket_items/items.routes.js"
import docketEwayBills from "./modules/docket_ewayBills/ewaybills.routes.js"
import docketFrieght from "./modules/docket_frieght/frieght.routes.js"

const router = Router()

router.use("/branch", branchRouter)
router.use("/auth", authRouter)
router.use("/consignor", consignorPartyRouter)
router.use("/consignee", consigneePartyRouter)
router.use("/sequence", sequenceRouter)
router.use("/party-products", partyProductsRouter)
router.use("/vehicle-size", vehicleSizeRouter)
router.use("/vehicle", vehicleRouter)
router.use("/rates", ratesRouter)
router.use("/docket", docketRouter)
router.use("/docket-items", docketItemRouter)
router.use("/docket-ewaybills", docketEwayBills)
router.use("/docket-ewaybills", docketEwayBills)
router.use("/docket-frieght", docketFrieght)

export default router