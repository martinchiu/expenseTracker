const express = require('express')
const router = express.Router()

const recordController = require('../../conrtollers/recordController')
// 新增
router.get('/new', recordController.create)
router.post('/', recordController.postRecord)
// 修改
router.get('/:id/edit', recordController.edit)
router.put('/:id', recordController.putEdit)
// 刪除
router.delete('/:id', recordController.delete)
module.exports = router
