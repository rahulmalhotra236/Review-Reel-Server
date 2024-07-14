import Space from "../models/space.models.js"

const widgetController = async (req, res) => {
  const { spaceName } = req.params
  console.log(spaceName)

  const space = await Space.findOne({ spaceName })
  console.log(space)
  if (!space) {
    return res.status(400).json({
      success: true,
      message: "No space found",
    })
  }
}

export { widgetController }
