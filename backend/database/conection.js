const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
