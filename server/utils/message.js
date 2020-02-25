//-----------------------------------------------------------------------------
// server/utils/message.js
//-----------------------------------------------------------------------------

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime(),
  }
}

module.exports = { generateMessage }
