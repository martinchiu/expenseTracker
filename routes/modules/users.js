const express = require('express')
const router = express.Router()

const userController = require('../../services/userController')
// 登入
router.get('/login', userController.login)
router.post('/login', userController.postLogin, userController.postLoginReqRes)
// 註冊
router.get('/register', userController.register)
router.post('/register', userController.postRegister)
// 登出
router.get('/logout', userController.logout)
module.exports = router