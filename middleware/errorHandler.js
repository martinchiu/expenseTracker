const errorHandler = ((err, req, res, next) => {
  console.log(err.stack)
  const message = '系統出錯，請點擊下方按鈕返回首頁'
  const statusCode = 500
  res.statusCode(statusCode).render('error', { message, statusCode })
})
module.exports = errorHandler