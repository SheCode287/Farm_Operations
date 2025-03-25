import {Router} from "express"
const router = Router()
import {getAllCrops, getCrop, createCrop, updateCrop, deleteCrop} from "../controllers/cropController.js"

router.route("/").get(getAllCrops).post(createCrop)
router.route("/:id").put(updateCrop).delete(deleteCrop).get(getCrop)

export default router