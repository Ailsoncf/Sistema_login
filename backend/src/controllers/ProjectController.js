const User = require('../models/User')

module.exports = {
  async show(request, response) {
    const users = await User.find()

    return response.status(200).json(users)
  },
}
