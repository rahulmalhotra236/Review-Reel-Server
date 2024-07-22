import express from "express"
import {
  createTestController,
  editTestController,
  getAllTestController,
  updateLikeTestController,
} from "../controllers/testimonial.controller.js"
import { protect } from "../middlewares/protect.js"

const router = express.Router()

router.get("/:spaceName/all-testimonials", protect, getAllTestController)
router.put("/:spaceName/:testimonialId/update-like", updateLikeTestController)
router.put("/:spaceName/edit-space", editTestController)
router.post("/:spaceName/create-testimonial", createTestController)

export default router
