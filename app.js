const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()

const routes = require('./routes')
require('./config/mongoose')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.engine('hbs', exphbs({ 
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    compared: function(a, b) {
      return a === b
    }
  }
 }))
app.set('view engine', 'hbs')


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})