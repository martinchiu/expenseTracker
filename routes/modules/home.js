const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// 首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(items => res.render('index', { items }))
    .catch(error => console.error(error))
})

module.exports = router
