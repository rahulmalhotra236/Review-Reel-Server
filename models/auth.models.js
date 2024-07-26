import mongoose from "mongoose"

const authSchema = mongoose.Schema({
  firstName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  ],
})

const Auth = mongoose.model("Auth", authSchema)

export default Auth
