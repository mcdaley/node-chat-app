//-----------------------------------------------------------------------------
// public/js/index.js
//-----------------------------------------------------------------------------
const socket = io();

// Connect to the web socket.
socket.on('connect', () => {
  console.log(`[INFO] Connected to the server`)
})

// Handle "newMessage" from server.
socket.on('newMessage', (message) => {
  console.log(`[INFO] Receieved newMessage event from the server: `, message)
  let li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li)
})

// Handle server disconnect
socket.on('disconnect', () => {
  console.log(`[INFO] Disconnected from the server`)
})

// Send the message
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, (response) => {
    console.log(`[INFO] Got it, response= `, response)
  })
})
