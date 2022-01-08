const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const CATEGORY = require('../../models/seeds/category.json').results

// 首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record.icon = CATEGORY.find(category => category.name === record.category).icon
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router
