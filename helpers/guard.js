const passport = require('passport')


const guard = (req, res, next) => {
  console.log('auth');
  next()
}

module.exports = guard