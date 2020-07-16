const { model, Schema } = require('mongoose')

const channelSchema = new Schema(
  {
    convo: [messageSchema]
  },
  { timestamps: true }
)

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

module.exports = model('Channel', channelSchema)
