const PORT = process.env.PORT || 3333
const express = require('express')
const User = require('./models/User')

const app = express()

const routes = require('./routes')

app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`servidor rodando em ${PORT}`))
