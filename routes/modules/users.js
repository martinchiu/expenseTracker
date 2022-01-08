const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
})
// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回註冊頁
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.render('login', { email }))
        .catch(err => console.log(err))
    }
  })
})
// 登出
module.exports = router