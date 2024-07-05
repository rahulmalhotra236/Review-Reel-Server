import mongoose from "mongoose"

const dbConnection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/review-reel")
    console.log("connected to db...")
  } catch (error) {
    console.log(`Error in connecting Db ${error}`)
  }
}

export default dbConnection
