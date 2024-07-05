import mongoose from "mongoose"

const testimonialSchema = mongoose.Schema({
  stars: {
    type: String,
    default: 5,
  },
  yourTestimonial: {
    type: String,
  },
  yourName: {
    type: String,
  },
  yourEmail: {
    type: String,
  },
})

const Testimonial = mongoose.model("Testimonial", testimonialSchema)

export default Testimonial
