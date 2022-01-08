const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const home = require('./modules/home')
const users = require('./modules/users')

router.use('/users', users)
router.use('/records', records)
router.use('/', home)

module.exports = router
