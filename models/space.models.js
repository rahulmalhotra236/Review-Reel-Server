import mongoose from "mongoose"

const spaceSchema = mongoose.Schema({
  spaceName: {
    type: String,
    unique: true,
  },

  headerTitle: {
    type: String,
  },
  yourCustomMessage: {
    type: String,
  },
  testimonials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  auth: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  ],
})

const Space = mongoose.model("Space", spaceSchema)

export default Space
