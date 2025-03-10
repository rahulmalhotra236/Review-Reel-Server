import Space from "../models/space.models.js"
import Testimonial from "../models/testimonial.models.js"

const createTestController = async (req, res) => {
  try {
    const { spaceName } = req.params
    const { stars, yourTestimonial, yourName, yourEmail } = req.body

    if (!yourTestimonial || !yourName || !yourEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const space = await Space.findOne({ spaceName })
    console.log(space)
    if (!space) {
      res.status(400).json({
        success: false,
        message: "No space found",
      })
    }

    const testimonial = await Testimonial.create({
      stars,
      yourTestimonial,
      yourName,
      yourEmail,
    })

    if (!testimonial) {
      return res.status(200).json({
        success: false,
        message: "Testimonial is not created",
      })
    }

    space.testimonials.push(testimonial._id)
    testimonial.space.push(space._id)

    await space.save()
    await testimonial.save()

    res.status(200).json({
      success: true,
      message: "Testimonial added",
      testimonial,
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Error in createTestController ${error.message}`,
    })
  }
}

const getAllTestController = async (req, res) => {
  try {
    const { spaceName } = req.params

    const space = await Space.findOne({ spaceName })
    if (!space) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }
    console.log(space._id)
    const testimonial = await Testimonial.find({ space: space._id })
    // const testimonial = await Testimonial.find()
    console.log(testimonial)
    if (!testimonial) {
      return res.status(200).json({
        success: false,
        message: "Testimonial is not created",
      })
    }

    res.status(200).json({
      success: true,
      message: "All testimonials",
      testimonial,
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Error in getAllTestController ${error.message}`,
    })
  }
}

const updateLikeTestController = async (req, res) => {
  // find space by params
  // find testimonial by space id
  // update heart to true or false

  const { spaceName, testimonialId } = req.params
  const { isLiked } = req.body
  const space = await Space.findOne({ spaceName })

  if (!space) {
    return res.status(400).json({
      success: true,
      message: "No space found",
    })
  }

  const testimonial = await Testimonial.findOneAndUpdate(
    { _id: testimonialId, space: space._id },
    { isLiked },
    { new: true }
  )
  if (!testimonial) {
    return res.status(400).json({
      success: false,
      message: "No testimonial found",
    })
  }
  res.status(200).json({
    success: true,
    message: "Testimonial updated successfully",
    testimonial,
  })
}
const editTestController = async (req, res) => {
  const { spacename } = req.params.spaceName
  const { spaceName, headerTitle, yourCustomMessage } = req.body

  try {
    const space = await Space.findOne({ spacename })

    if (!space) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }

    const updatedSpace = await Space.findOneAndUpdate(
      { spacename },
      { spaceName, headerTitle, yourCustomMessage },
      { new: true }
    )

    if (!updatedSpace) {
      return res.status(400).json({
        success: false,
        message: "No space found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Space updated successfully",
      space: updatedSpace,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export {
  createTestController,
  getAllTestController,
  updateLikeTestController,
  editTestController,
}
