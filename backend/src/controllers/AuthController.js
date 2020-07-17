const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/genarateToken')
const crypto = require('crypto')
const mailer = require('../modules/mailer')

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

      const token = generateToken(user.id)

      return response.status(201).json({ user, token })
    } catch (err) {
      return response.status(406).json({ error: 'Registration Failed' })
    }
  },

  async signIn(request, response) {
    const { email, password } = request.body

    console.log(password)
    const user = await User.findOne({ email }).select('+password')

    if (!user) return response.status(404).send({ error: 'User not found' })

    const comparePass = await bcrypt.compare(password, user.password)

    if (!comparePass)
      return response.status(401).send({ error: 'Invalid Password' })

    user.password = undefined

    const token = generateToken(user.id)

    return response.json({ user, token })
  },

  async passrec(request, response) {
    const { email } = request.body
    try {
      const user = await User.findOne({ email })

      if (!user) return response.status(404).send({ error: 'User not found' })

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()

      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: now,
          },
        },
        { new: true, useFindAndModify: false }
      )

      mailer.sendMail(
        {
          to: email,
          from: 'ailson_cf@yahoo.com.br',
          template: 'auth/forgotPass',
          context: { token },
        },
        (err) => {
          if (err)
            return response
              .status(400)
              .send({ error: 'Cannot send recover email' })

          return response.send()
        }
      )
    } catch (err) {
      response.status(400).send({ error: 'Error on forgot password' })
    }
  },

  async passreset(request, response) {
    const { email, token, password } = request.body

    try {
      const user = await User.findOne({ email }).select(
        '+passwordResetToken passwordResetExpires'
      )

      if (!user) return response.status(400).send({ error: 'User not found' })

      if (token !== user.passwordResetToken)
        return response.status(400).send({ error: 'Token invalid' })

      const now = new Date()

      if (now > user.passwordResetExpires)
        return response
          .status(400)
          .send({ error: 'Token expired, generate a new one' })

      user.password = await bcrypt.hash(password, 10)

      await user.save()

      response.send()
    } catch (err) {
      return response.status(400).send({ error: 'Error on reset password' })
    }
  },
}
