import Auth from "../models/auth.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// const signinController = async (req, res) => {
//   const { email, password } = req.body
// }

const signinController = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    // Send response
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production",
    })
    return res.status(200).json({ message: "Sign-in successful", token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const signupController = async (req, res) => {
  const { firstName, email, password } = req.body

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

const signoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS in production
    // secure: process.env.NODE_ENV === "production",
  })
  return res.status(200).json({ message: "Signout successful" })
}

const profileController = async (req, res) => {
  try {
    const userId = req.user._id
    console.log(userId)
    const user = await Auth.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    console.log(user)
    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

const editProfileController = async (req, res) => {
  try {
    const userId = req.user._id
    const { firstName } = req.body

    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "First name is required",
      })
    }

    const user = await Auth.findByIdAndUpdate(
      userId,
      { firstName },
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export {
  signinController,
  signupController,
  signoutController,
  profileController,
  editProfileController,
}
