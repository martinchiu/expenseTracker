const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const CATEGORY = require('../../models/seeds/category.json').results

// 首頁
router.get('/', (req, res) => {
  let totalAmount = 0

  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record.icon = CATEGORY.find(category => category.name === record.category).icon
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount})
    })
    .catch(error => console.error(error))
})

module.exports = router
