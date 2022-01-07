const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

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
// 設定首頁路由
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(items => res.render('index', {items}))
    .catch(error => console.error(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})