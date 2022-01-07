const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/expense-tracker') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const Record = require('./models/record')
// 首頁
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(items => res.render('index', {items}))
    .catch(error => console.error(error))
})
// 新增
app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  const {name, date, amount} = req.body
  Record.create({ name, date, amount})
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})
// 瀏覽
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('detail', { record }))
    .catch(error => console.log(error))
})
// 修改
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const newRecord = req.body
  return Record.findOneAndUpdate({ id }, newRecord)
    .then(() => res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})
// 刪除
app.delete('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndDelete({_id})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})