//-----------------------------------------------------------------------------
// server/utils/validations.js
//-----------------------------------------------------------------------------

const isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0
}

module.exports = { isRealString }