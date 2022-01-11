const express = require('express')
const router = express.Router()

const homeController = require('../../services/homeController')
// 首頁
router.get('/', homeController.home)
// 分類
router.get('/:sort', homeController.sort)

module.exports = router
