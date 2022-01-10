const express = require('express')
const router = express.Router()

const passport = require('passport')
// facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// google
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));
// Google 發資料回來
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
module.exports = router