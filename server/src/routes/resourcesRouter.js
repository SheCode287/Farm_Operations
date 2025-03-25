import {Router} from "express"
const router = Router()
import {createResource, getAllResources} from "../controllers/resourcesController.js"

router.route("/").get(getAllResources).post(createResource)

export default router