const express = require('express')
const router = express.Router()

const Channel = require('../models/Channel')

router.get('/:channelName', async (req, res) => {
  const channelName = req.params.channelName

  const channel = await Channel.findOne({ name: channelName })

  if (!channel) return res.json('No channel found')

  res.json(channel.convo)
})

router.patch('/:channelName', async (req, res) => {
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
