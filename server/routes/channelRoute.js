const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Channel = require('../models/Channel')

// check jwt token middleware
function checkJwt(req, _, next) {
  const token = req.headers.authorization.split('Bearer ')[1]
  const validateToken = jwt.verify(token, process.env.SECRET_KEY)

  // if token is invalid
  if (!validateToken) return validateToken

  // if valid
  return next()
}

router.get('/:channelName', checkJwt, async (req, res) => {
  const channelName = req.params.channelName

  const channel = await Channel.findOne({ name: channelName })

  if (!channel) return res.json('No channel found')

  res.json(channel.convo)
})

router.patch('/:channelName', checkJwt, async (req, res) => {
  const channelName = req.params.channelName
  const msgObject = req.body.msgObject

  const channel = await Channel.findOne({ name: channelName })

  if (!channel) return res.json('No channel found')

  channel.convo.push(msgObject)

  const { convo } = await channel.save()
  const returnObj = convo[convo.length - 1]

  res.json(returnObj)
})

module.exports = router
