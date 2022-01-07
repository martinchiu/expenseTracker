const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()

const routes = require('./routes')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
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


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})