const session = require('express-session')

module.exports = {
  Session: session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
}