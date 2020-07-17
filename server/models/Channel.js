const { model, Schema } = require('mongoose')

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const channelSchema = new Schema(
  {
    name: {
      type: String,
      default: 'basic'
    },
    convo: [messageSchema]
  },
  { timestamps: true }
)

module.exports = model('Channel', channelSchema)
