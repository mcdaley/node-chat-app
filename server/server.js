//-----------------------------------------------------------------------------
// server/server.js
//-----------------------------------------------------------------------------
const path                = require('path')
const http                = require('http')
const express             = require('express')
const socketIO            = require('socket.io')

const { Users }           = require('./utils/users')
const { 
  generateMessage,
  generateLocationMessage 
}                         = require('./utils/message')
const {
  isRealString
}                         = require('./utils/validations')

const publicPath  = path.join(__dirname, '/../public')
const port        = process.env.PORT || 3000

const app         = express()
const server      = http.createServer(app)
const io          = socketIO(server)
var   users       = new Users()

app.use(express.static(publicPath))
io.on('connection', (socket) => {
  console.log(`[INFO] New user connected`)

  // Join a chat room
  socket.on('join', (params, callback) => {
    console.log(`[INFO] User joining chat room, param= `, params)

    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.')
    }

    // Join the chat room
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    // Send the updateUserList message
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    // Send welcome message to the new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    // Broadcast new user message message
    socket.broadcast.to(params.room).emit(
      'newMessage', 
      generateMessage('Admin', `${params.name} has joined the chat`)
    )

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    console.log(`[INFO] Received createMessage event: `, message)
    
    io.emit('newMessage', {
      from:       message.from,
      text:       message.text,
      createdAt:  new Date().getTime(),
    });

    callback('ACK')
  })

  socket.on('createLocationMessage', (coords) => {
    console.log(`[INFO] Received createLocationMessage, coords = `, coords)
    io.emit('newLocationMessage', generateLocationMessage(
      'Admin', 
      coords.latitude, 
      coords.longitude
    ))
  })

  socket.on('disconnect', () => {
    console.log(`[INFO] User disconnected from the server`)
    let user = users.removeUser(socket.id)

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit(
        'newMessage', 
        generateMessage('Admin', `${user.name} has left the chat.`)
      )
    }
  })  
})

server.listen(port, () => {
  console.log(`[INFO] Server is running on port ${port}`)
})