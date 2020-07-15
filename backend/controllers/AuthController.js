const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
  async signUp(request, response) {
    const { name, email, password } = request.body

    const emailExists = await User.findOne({ email })

    try {
      if (emailExists)
        return response
          .status(409)
          .json({ error: 'Email already exists, try another one!' })

      const hash = await bcrypt.hash(password, 10)

      const user = await User.create({
        name,
        email,
        password: hash,
      })

      user.password = undefined

      return response.status(201).json(user)
    } catch (err) {
      return response.status(406).json({ error: 'Registration Failed' })
    }
  },

  async signIn(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) return response.status(404).send({ error: 'User not found' })

    const comparePass = await bcrypt.compare(password, user.password)

    if (!comparePass)
      return response.status(401).send({ error: 'Invalid Password' })

    return response.json(user)
  },
}
