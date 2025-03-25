import {Router} from "express"
const router = Router()
import {getAllActivities, createActivity} from "../controllers/activitiesController.js"

router.route("/").get(getAllActivities).post(createActivity)


export default router