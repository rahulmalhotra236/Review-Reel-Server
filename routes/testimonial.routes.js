import express from "express"
import {
  createTestController,
  getAllTestController,
} from "../controllers/testimonial.controller.js"

const router = express.Router()

router.get("/:spaceName/all-testimonials", getAllTestController)
router.post("/:spaceName/create-testimonial", createTestController)

export default router
