import express from "express"
import {
  createTestController,
  editTestController,
  getAllTestController,
  updateLikeTestController,
} from "../controllers/testimonial.controller.js"

const router = express.Router()

router.get("/:spaceName/all-testimonials", getAllTestController)
router.put("/:spaceName/:testimonialId/update-like", updateLikeTestController)
router.put("/:spaceName/:testimonialId/edit-testimonial", editTestController)
router.post("/:spaceName/create-testimonial", createTestController)

export default router
