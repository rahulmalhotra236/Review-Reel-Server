import jwt from "jsonwebtoken"
import Auth from "../models/auth.models.js"

const protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

      const userId = data.userId
      let user = await Auth.findById(userId)

      req.user = user
      next()
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Not Authorised",
      })
    }
  }

  if (!req.cookies.token) {
    res.status(400).json({
      success: false,
      message: "Not Authorised , you don't have permission to access",
    })
  }
}
export { protect }
