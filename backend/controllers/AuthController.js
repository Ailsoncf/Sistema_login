const User = require("../models/User")

module.exports = {
  async signUp(request, response) {
    const { name, email, password } = request.body

    const user = await User.create({
      name,
      email,
      password,
    })
    return response.json(user)
  },
}
