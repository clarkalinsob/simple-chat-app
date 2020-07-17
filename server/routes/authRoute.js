const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Channel = require('../models/Channel')

router.post('/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  // verify channel
  const verifyChannel = await Channel.findOne({ name: 'basic' })
  if (!verifyChannel) {
    const newChannel = new Channel({
      name: 'basic',
      convo: []
    })

    await newChannel.save()
  }

  const user = await User.findOne({ username })
  let token

  // if new user, create new user
  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      password: hashPassword
    })

    await newUser.save()

    token = await jwt.sign({ user: { username } }, process.env.SECRET_KEY, {
      expiresIn: '12h'
    })
    return res.json({ token })
  }

  // if user exist, then verify
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.json('Password did not match')

  token = await jwt.sign({ user: { username } }, process.env.SECRET_KEY, {
    expiresIn: '12h'
  })
  res.json({ token })
})

module.exports = router
