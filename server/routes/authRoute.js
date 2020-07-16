const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/signup', async (req, res) => {
  const username = req.body.username
  const password = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    username,
    password
  })

  const user = await newUser.save()

  res.json(user)
})

router.post('/signin', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  const username = req.body.username
  const password = req.body.password

  const user = await User.findOne({ username })

  if (!user) return res.json('No user found')

  const match = await bcrypt.compare(password, user.password)

  if (!match) return res.json('Password did not match')

  const token = jwt.sign({ user: { username: user.username } }, process.env.SECRET_KEY)

  res.json({ token })
})

module.exports = router
