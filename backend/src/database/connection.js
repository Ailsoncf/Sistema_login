const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set('useCreateIndex', true, 'useFindAndModify', false)

module.exports = mongoose
