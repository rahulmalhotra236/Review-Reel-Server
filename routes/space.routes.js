import express from "express"
import {
  dashboardController,
  deleteSpaceController,
  newSpaceController,
} from "../controllers/space.controller.js"

const router = express.Router()

router.get("/", dashboardController)
router.post("/new-space", newSpaceController)
router.delete("/:spaceName/delete", deleteSpaceController)

export default router
