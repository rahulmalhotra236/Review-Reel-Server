import express from "express"
import {
  dashboardAllSpaceController,
  dashboardController,
  deleteSpaceController,
  newSpaceController,
} from "../controllers/space.controller.js"
import { protect } from "../middlewares/protect.js"

const router = express.Router()

router.get("/:spaceame", dashboardController)
router.get("/", protect, dashboardAllSpaceController)
router.post("/new-space", protect, newSpaceController)
router.delete("/:spaceName/delete", deleteSpaceController)

export default router
