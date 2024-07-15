import Space from "../models/space.models.js"
import Testimonial from "../models/testimonial.models.js"

const widgetController = async (req, res) => {
  // get spaceName from parasm
  // check that space is exist or not
  // if exist then show all testimonials whose liked

  const { spaceName } = req.params
  console.log(spaceName)

  const space = await Space.findOne({ spaceName })

  if (!space) {
    return res.status(400).json({
      success: true,
      message: "No space found",
    })
  }

  const testimonials = await Testimonial.find({
    space: space._id,
    isLiked: true,
  })
  res.status(200).json({ testimonials })
}

export { widgetController }
