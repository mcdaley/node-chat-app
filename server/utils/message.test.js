//-----------------------------------------------------------------------------
// server/utils/message.test.js
//-----------------------------------------------------------------------------
const expect              = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('Returns a correct message object', () => {
    let from    = 'Marv'
    let text    = 'Test message'

    let message = generateMessage(from, text)
    //* expect(message.from).toBe(from)
    //* expect(message.text).toBe(text)
    expect(message).toInclude({from, text})
    expect(message.createdAt).toBeA('number')
  })
})
