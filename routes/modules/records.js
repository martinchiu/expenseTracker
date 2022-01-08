const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')

// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 修改
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = moment(record.date).format("YYYY-MM-DD")
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const newRecord = req.body
  return Record.findOneAndUpdate({ id }, newRecord)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})
// 刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
