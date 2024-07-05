import express from "express"
import dotenv from "dotenv"
import spaceRoute from "./routes/space.routes.js"
import testimonialRoute from "./routes/testimonial.routes.js"
import dbConnection from "./config/db.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/dashboard", spaceRoute)
app.use("/api/v1/testimonial", testimonialRoute)

dbConnection()
app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})
