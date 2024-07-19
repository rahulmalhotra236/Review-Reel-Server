import Auth from "../models/auth.models.js"
import bcrypt from "bcrypt"

const signinController = async (req, res) => {
  const { email, password } = req.body
}

const signupController = async (req, res) => {
  const { firstName, email, password } = req.body
  console.log(firstName, email, password)

  if (!firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    })
  }

  try {
    const user = await Auth.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new Auth({
      firstName,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({
      success: true,
      message: "Signup successful",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export default signupController

export { signinController, signupController }
