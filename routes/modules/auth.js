const express = require('express')
const router = express.Router()

const authController = require('../../services/authController')
const passport = require('passport')
// facebook
router.get('/facebook', authController.getFacebook)

router.get('/facebook/callback', authController.getFacebookCallback)
// google
router.get('/google', authController.getGoogle)

router.get('/google/callback', authController.getGoogleCallback)

module.exports = router