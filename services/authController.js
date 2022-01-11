const passport = require('passport')

module.exports = {
  // facebook
  getFacebook: passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  }),
  getFacebookCallback: passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }),
  // google
  getGoogle: passport.authenticate('google', {
    scope: ['email', 'profile']
  }),
  getGoogleCallback: passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
}