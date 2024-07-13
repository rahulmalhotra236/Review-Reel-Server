import express from "express"
const router = express.Router()

router.get("/widget/:spaceName", (req, res) => {
  const testimonialData = {
    testimonial: "Great product! Really helped me.",
    author: "John Doe",
  }

  const widgetHTML = `
        <div class="testimonial-widget">
            <p>${testimonialData.testimonial}</p>
            <p>- ${testimonialData.author}</p>
        </div>
    `

  // Respond with the widget HTML
  res.send(widgetHTML)
})

export default router
