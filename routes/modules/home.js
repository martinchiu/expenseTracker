const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// 首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

module.exports = router
