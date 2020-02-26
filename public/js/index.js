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

// Send your location
let locationButton = jQuery('#send-location')
locationButton.on('click', () => {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition( (position) => {
    console.log(`[DEBUG] position = `, position)
    socket.emit('createLocationMessage', {
      latitude:   position.coords.latitude,
      longitude:  position.coords.longitude,
    })
  }, () => {
    alert('Unable to fetch your location')
  })
})

// Handle newLocationMessage
socket.on('newLocationMessage', (message) => {
  let li = jQuery('<li></li>')
  li.text(`${message.from}: `)

  let a  = jQuery('<a target="_blank">My current location</a>')
  a.attr('href', message.url)

  li.append(a)
  jQuery('#messages').append(li)
})
