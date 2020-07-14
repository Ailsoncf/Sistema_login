const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = {
  async signUp(request, response) {
    const { name, email, password } = request.body

    const emailExists = await User.findOne({ email })

    try {
      if (emailExists)
        return response
          .status(409)
          .json({ error: "Email already exists, try another one!" })

      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({
        name,
        email,
        password: hash,
      })

      user.password = undefined

      return response.json(user)
    } catch (err) {
      return response.status(406).json({ error: "Registration Failed" })
    }
  },

  async signIn(request, response) {
    return response.json({ message: "funcionando" })
  },
}
