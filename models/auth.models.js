import mongoose from "mongoose"

const authSchema = mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
  },
  space: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  ],
})

const Auth = mongoose.model("Auth", authSchema)

export default Auth
