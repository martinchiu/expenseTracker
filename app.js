const express = require('express')
const exphbs = require('express-handlebars')

const methodOverride = require('method-override')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const {localSetting} = require('./middleware/localsSetting')
const { Session } = require('./middleware/session')
require('./config/mongoose')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(Session)
usePassport(app)
app.use(flash())
app.use(localSetting)
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
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})