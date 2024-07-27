import express from "express"
import {
  signinController,
  signoutController,
  signupController,
} from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController)
router.post("/signout", signoutController)

export default router
