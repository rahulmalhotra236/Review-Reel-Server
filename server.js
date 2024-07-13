import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import spaceRoute from "./routes/space.routes.js"
import testimonialRoute from "./routes/testimonial.routes.js"
import widgetRoute from "./routes/widget.routes.js"
import dbConnection from "./config/db.js"
dotenv.config()

const app = express()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/dashboard", spaceRoute)
app.use("/api/v1/testimonial", testimonialRoute)
app.use("/api/v1/", widgetRoute)

dbConnection()
app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})
