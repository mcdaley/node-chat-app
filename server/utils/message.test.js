//-----------------------------------------------------------------------------
// server/utils/message.test.js
//-----------------------------------------------------------------------------
const expect              = require('expect')

const { 
  generateMessage,
  generateLocationMessage 
}                         = require('./message')

describe('generateMessage', () => {
  it('Returns a correct message object', () => {
    let from    = 'Marv'
    let text    = 'Test message'

    let message = generateMessage(from, text)
    
    expect(message).toInclude({from, text})
    expect(message.createdAt).toBeA('number')
  })
})

describe('generateLocationMessage', () => {
  it('Returns a new location message', () => {
    let from      = 'Marv'
    let latitude  = '37.3124'
    let longitude = '-122.556'

    let message   = generateLocationMessage(from, latitude, longitude)
    expect(message).toInclude({from})
    expect(message.url).toBe(`https://www.google.com/maps?${latitude},${longitude}`)
    expect(message.createdAt).toBeA('number')
  })
})
