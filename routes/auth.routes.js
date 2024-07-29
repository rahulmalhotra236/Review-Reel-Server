import express from "express"
import {
  profileController,
  signinController,
  signoutController,
  signupController,
} from "../controllers/auth.controller.js"
import { protect } from "../middlewares/protect.js"

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController)
router.post("/signout", protect, signoutController)
router.get("/profile", protect, profileController)

export default router
