const moment = require('moment')

const Record = require('../models/record')
const CATEGORY = require('../models/seeds/category.json').results

module.exports = {
  // 首頁
  home: (req, res) => {
    let totalAmount = 0
    const userId = req.user._id
    Record.find({ userId })
      .lean()
      .then(records => {
        records.forEach(record => {
          record.date = moment(record.date).format("YYYY-MM-DD")
          record.icon = CATEGORY.find(category => category.name === record.category).icon
          totalAmount += record.amount
        })
        res.render('index', { records, totalAmount })
      })
      .catch(error => console.error(error))
  },
  // 分類
  sort: (req, res) => {
    let totalAmount = 0

    const sort = req.params.sort
    const sortWay = {}

    switch (sort) {
      case '家居物業':
        sortWay.name = '家居物業'
        break
      case '交通出行':
        sortWay.name = '交通出行'
        break
      case '休閒娛樂':
        sortWay.name = '休閒娛樂'
        break
      case '餐飲食品':
        sortWay.name = '餐飲食品'
        break
      case '其他':
        sortWay.name = '其他'
        break
    }
    const userId = req.user._id
    Record.find({ category: sortWay.name, userId })
      .lean()
      .then(records => {
        records.forEach(record => {
          record.date = moment(record.date).format("YYYY-MM-DD")
          record.icon = CATEGORY.find(category => category.name === record.category).icon
          totalAmount += record.amount
        })
        res.render('index', { records, totalAmount })
      })
      .catch(error => console.log(error))
  }
}