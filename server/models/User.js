const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
