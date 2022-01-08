const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category})
    .lean()
    .then(item => {
      const categoryId = item._id
      Record.create({ name, date, category, amount, userId, categoryId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})
// 修改
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({_id, userId})
    .lean()
    .then((record) => {
      record.date = moment(record.date).format("YYYY-MM-DD")
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newRecord = req.body
  return Record.findOneAndUpdate({ _id, userId }, newRecord)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})
// 刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
