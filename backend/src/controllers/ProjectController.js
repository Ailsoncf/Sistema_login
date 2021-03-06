const User = require('../models/User')

module.exports = {
  async show(request, response) {
    const users = await User.find()

    return response.status(200).json(users)
  },

  async showUser(request, response) {
    const { id } = request.params

    const user = await User.findById({ _id: id })

    return response.status(200).json(user)
  },
}
