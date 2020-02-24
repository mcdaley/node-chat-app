//-----------------------------------------------------------------------------
// server/server.js
//-----------------------------------------------------------------------------
const path      = require('path')
const http      = require('http')
const express   = require('express')
const socketIO  = require('socket.io')

const publicPath  = path.join(__dirname, '/../public')
const port        = process.env.PORT || 3000

const app         = express()
const server      = http.createServer(app)
const io          = socketIO(server)

app.use(express.static(publicPath))
io.on('connection', (socket) => {
  console.log(`[INFO] New user connected`)

  socket.on('disconnect', () => {
    console.log(`[INFO] User disconnected from the server`)
  })  
})

server.listen(port, () => {
  console.log(`[INFO] Server is running on port ${port}`)
})