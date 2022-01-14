const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
module.exports = {
  // 登入
  login: (req, res) => {
    res.render('login')
  },
  postLogin: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  // 註冊
  register: (req, res) => {
    res.render('register')
  },
  postRegister: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const user = await User.findOne({ email })
    // 如果已經註冊：退回註冊頁
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({
      name,
      email,
      password: hash
    })
    try {
      res.render('login', { email })
    } catch (err) {
      console.log(err)
    }
  },
  // 登出
  logout: (req, res) => {
    req.logout()
    req.flash('success', '你已經成功登出。')
    res.redirect('/users/login')
  }
}