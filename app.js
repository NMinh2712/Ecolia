const express = require("express")
const path = require("path")
const app = express()

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Store session data in memory (MVP phase)
const sessions = {}

// Routes
app.get("/", (req, res) => {
  res.render("home")
})

app.get("/ai-reading", (req, res) => {
  res.render("ai-form")
})

app.post("/api/ai-reading", (req, res) => {
  const { emotion, color, intention, birthDate, zodiac } = req.body

  // AI Logic - Rule-based mapping
  const stoneMap = {
    stress_brown: {
      stones: ["Smoky Quartz", "Moonstone"],
      energy: "Thiếu Hỏa",
      message: "Bạn cần động lực và sự dịu dàng",
    },
    stress_gold: {
      stones: ["Sunstone", "Citrine"],
      energy: "Thâm uất cần sáng",
      message: "Hãy để sáng sủa lấp đầy trái tim",
    },
    lonely_pink: { stones: ["Rose Quartz", "Rhodonite"], energy: "Cô đơn", message: "Yêu thương bản thân là bước đầu" },
    lonely_blue: { stones: ["Aquamarine", "Lapis Lazuli"], energy: "Tìm kiếm", message: "Sự kết nối đang chờ bạn" },
    lost_brown: { stones: ["Tiger's Eye", "Carnelian"], energy: "Mất hướng", message: "Tìm lại sức mạnh bên trong" },
    lost_gold: { stones: ["Amber", "Sunstone"], energy: "Cần định hướng", message: "Con đường của bạn đang sáng lên" },
    balance_purple: {
      stones: ["Amethyst", "Labradorite"],
      energy: "Cân bằng thiết yếu",
      message: "Hòa hợp với chính mình",
    },
    balance_white: {
      stones: ["Clear Quartz", "Selenite"],
      energy: "Thanh tịnh",
      message: "Sáng suốt là nguồn lực của bạn",
    },
  }

  const key = `${emotion}_${color}`.toLowerCase()
  const result = stoneMap[key] || {
    stones: ["Rose Quartz", "Amethyst", "Sunstone"],
    energy: "Tìm kiếm cân bằng",
    message: "Mỗi mảnh ghép đều có ý nghĩa riêng của nó",
  }

  const sessionId = Date.now().toString()
  sessions[sessionId] = {
    emotion,
    color,
    intention,
    birthDate,
    zodiac,
    ...result,
  }

  res.json({ sessionId, ...result })
})

app.get("/result/:sessionId", (req, res) => {
  const { sessionId } = req.params
  const data = sessions[sessionId]

  if (!data) {
    return res.redirect("/")
  }

  res.render("result", { data })
})

app.get("/product/:productId", (req, res) => {
  const { productId } = req.params // Declare the variable here
  const products = {
    "sunstone-rose-quartz": {
      id: "sunstone-rose-quartz",
      title: "Vòng tay Hỏa Yêu",
      stones: ["Sunstone", "Rose Quartz"],
      energy: "Động lực + Yêu thương",
      price: "150.000",
      description: "Chiếc vòng được thiết kế riêng cho năng lượng của bạn",
    },
    "smoky-moonstone": {
      id: "smoky-moonstone",
      title: "Vòng tay Dịu dàng",
      stones: ["Smoky Quartz", "Moonstone"],
      energy: "Thiếu Hỏa - Cần động lực",
      price: "150.000",
      description: "Sự an tâm qua từng mảnh đá",
    },
  }

  const product = products[productId] || products["sunstone-rose-quartz"]
  res.render("product", { product })
})

app.get("/about", (req, res) => {
  res.render("about")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`MẢNH server is running on http://localhost:${PORT}`)
})
