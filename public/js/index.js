//-----------------------------------------------------------------------------
// public/js/index.js
//-----------------------------------------------------------------------------
const socket = io();

socket.on('connect', () => {
  console.log(`[INFO] Connected to the server`)

  /** 
    socket.emit('createMessage', {
      from: 'Jimbo',
      text: 'Hey, stop throwing interceptions',
    })
  **/
})

socket.on('newMessage', (message) => {
  console.log(`[INFO] Receieved newMessage event from the server: `, message)
})

socket.on('disconnect', () => {
  console.log(`[INFO] Disconnected from the server`)
})
