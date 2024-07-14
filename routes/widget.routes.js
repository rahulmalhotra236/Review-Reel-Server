import express from "express"
import { widgetController } from "../controllers/widgetController.js"
const router = express.Router()

router.get("/widget/:spaceName", widgetController)

export default router
