const PORT = process.env.PORT || 3333
const express = require("express")

const routes = require("./routes")

const app = express()

app.use(routes)
app.use(express.json())

app.listen(PORT, () => console.log(`servidor rodando em ${PORT}`))
