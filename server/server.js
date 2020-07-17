const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const authRoute = require('./routes/authRoute')
const channelRoute = require('./routes/channelRoute')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

// authentication route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/channels', channelRoute)

// socket.io
io.on('connection', socket => {
  socket.on('new-message', msg => {
    Object.assign(msg, { _id: socket.id })

    socket.broadcast.emit('new-message', msg)
  })

  socket.on('disconnect', () => console.log(`${socket.id} disconnected`))
})

// run mongo and server port
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB')
    return server.listen(PORT, () => console.log(`Successfully listening on port ${PORT}`))
  })
  .catch(e => console.log(e))
