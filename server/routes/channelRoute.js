const express = require('express')
const router = express.Router()

const Channel = require('../models/Channel')

router.get('/:channelId', async (req, res) => {
  const channelId = req.params.channelId

  const channel = await Channel.findById(channelId)

  if (!channel) return res.json('No channel found')

  res.json(channel.convo)
})

router.patch('/:channelId', async (req, res) => {
  const channelId = req.params.channelId
  const msgObject = req.body.msgObject

  const channel = await Channel.findById(channelId)

  if (!channel) return res.json('No channel found')

  channel.convo.push(msgObject)

  await channel.save()

  res.json('Message saved')
})

module.exports = router
