import express from "express"
import {
  signinController,
  signupController,
} from "../controllers/auth.controller.js"

const router = express.Router()

router.get("/signin", signinController)
router.get("/signup", signupController)

export default router
