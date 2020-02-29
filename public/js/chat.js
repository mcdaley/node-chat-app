//-----------------------------------------------------------------------------
// public/js/chat.js
//-----------------------------------------------------------------------------
const socket = io();

// Connect to the web socket.
socket.on('connect', () => {
  console.log(`[INFO] Connected to the server`)
  let params = jQuery.deparam(window.location.search)

  socket.emit('join', params, (err) => {
    if(err) {
      console.log(`[ERROR] Failed to join chat room, err= `, err)
      alert(err)
      window.location.href = '/'
    }
    else {
      console.log(`[INFO] Joined the chat room`)
    }
  })
})

// Handle "newMessage" from server.
socket.on('newMessage', (message) => {
  console.log(`[INFO] Receieved newMessage event from the server: `, message)
  /** 
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let li            = jQuery('<li></li>')
    li.text(`${message.from} at ${formattedTime}: ${message.text}`)

    jQuery('#messages').append(li)
  **/
 let formattedTime  = moment(message.createdAt).format('h:mm a')
 let template       = jQuery('#message-template').html()
 
 html = Mustache.render(template, {
   from:      message.from,
   text:      message.text,
   createdAt: formattedTime,
 })
 jQuery('#messages').append(html)
})

// Handle server disconnect
socket.on('disconnect', () => {
  console.log(`[INFO] Disconnect user from the server`)
})

// Update and display the users in the chat room
socket.on('updateUserList', (users) => {
  console.log(`[DEBUG] received updateUsersList, users = `, users)
  let ol = jQuery('<ol></ol>')

  users.forEach( (user) => {
    ol.append(jQuery('<li></li>').text(user))
  })
  jQuery('#user').html(ol)
})

// Send the message
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault()

  let messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, (response) => {
    console.log(`[INFO] Got it, response= `, response)
    messageTextbox.val('')
  })
})

// Send your location
let locationButton = jQuery('#send-location')
locationButton.on('click', () => {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition( (position) => {
    console.log(`[DEBUG] position = `, position)
    locationButton.removeAttr('disabled').text('Send Location')

    socket.emit('createLocationMessage', {
      latitude:   position.coords.latitude,
      longitude:  position.coords.longitude,
    })
  }, () => {
    locationButton.removeAttr('disabled').text('Send Location')
    alert('Unable to fetch your location')
  })
})

// Handle newLocationMessage
socket.on('newLocationMessage', (message) => {
  /**  
    let formattedTime = moment(message.createdAt).format('h:mm a')

    let li = jQuery('<li></li>')
    li.text(`${message.from} at ${formattedTime}: `)

    let a  = jQuery('<a target="_blank">My current location</a>')
    a.attr('href', message.url)

    li.append(a)
    jQuery('#messages').append(li)
  **/
 let formattedTime  = moment(message.createdAt).format('h:mm a')
 let template       = jQuery('#location-message-template').html()

 let html = Mustache.render(template, {
   from:      message.from,
   url:       message.url,
   createdAt: formattedTime,
 })

 jQuery('#messages').append(html)
})
