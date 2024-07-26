import express from "express"
import {
  dashboardAllSpaceController,
  dashboardController,
  deleteSpaceController,
  newSpaceController,
} from "../controllers/space.controller.js"

const router = express.Router()

router.get("/:spaceName", dashboardController)
router.get("/", dashboardAllSpaceController)
router.post("/new-space", newSpaceController)
router.delete("/:spaceName/delete", deleteSpaceController)

export default router
