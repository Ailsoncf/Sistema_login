const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set('useCreateIndex', true)

module.exports = mongoose
