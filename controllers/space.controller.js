import Auth from "../models/auth.models.js"
import Space from "../models/space.models.js"

const dashboardController = async (req, res) => {
  try {
    const { spaceName } = req.params
    console.log("don" + spaceName)
    const space = await Space.findOne({ spaceName })

    if (!space) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }
    res.status(200).json({
      success: true,
      space,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in dashboardController ${error.message}`,
    })
  }
}

const dashboardAllSpaceController = async (req, res) => {
  try {
    const space = await Space.find()
    if (!space) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }
    res.status(200).json({
      success: true,
      space,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in dashboardAllSpaceController ${error.message}`,
    })
  }
}
const newSpaceController = async (req, res) => {
  try {
    const { spaceName, headerTitle, yourCustomMessage } = req.body
    const userId = req.user._id

    if (!spaceName || !headerTitle || !yourCustomMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }
    const space = await Space.create({
      spaceName,
      headerTitle,
      yourCustomMessage,
      user: userId,
    })

    if (!space) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }

    await space.save()
    const user = await Auth.findById(userId)
    if (user) {
      user.spaces.push(space._id)
      await user.save()
    }

    res.status(200).json({
      success: true,
      message: "Space created",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in newSpaceController ${error.message}`,
    })
  }
}

const deleteSpaceController = async (req, res) => {
  try {
    const { spaceName } = req.params

    const space = await Space.findOneAndDelete({ spaceName })
    if (!space) {
      res.status(400).json({
        success: false,
        message: "space not found",
      })
    }
    res.status(200).json({
      success: true,
      space,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in deleteSpaceController ${error.message}`,
    })
  }
}

export {
  dashboardController,
  newSpaceController,
  deleteSpaceController,
  dashboardAllSpaceController,
}
