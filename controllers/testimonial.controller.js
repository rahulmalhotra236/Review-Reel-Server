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

export { createTestController, getAllTestController }
