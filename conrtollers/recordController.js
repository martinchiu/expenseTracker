const moment = require('moment')

const Record = require('../models/record')
const Category = require('../models/category')

module.exports = {
  // 新增
  create: (req, res) => {
    return res.render('new')
  },
  postRecord: (req, res) => {
    const userId = req.user._id
    const { name, date, category, amount } = req.body
    Category.findOne({ name: category })
      .lean()
      .then(item => {
        const categoryId = item._id
        Record.create({ name, date, category, amount, userId, categoryId })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      })
  },
  // 修改
  edit: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
      .lean()
      .then((record) => {
        record.date = moment(record.date).format("YYYY-MM-DD")
        res.render('edit', { record })
      })
      .catch(error => console.log(error))
  },
  putEdit: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const newRecord = req.body
    return Record.findOneAndUpdate({ _id, userId }, newRecord)
      .then(() => res.redirect(`/`))
      .catch(error => console.log(error))
  },
  delete: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Record.findOneAndDelete({ _id, userId })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
}