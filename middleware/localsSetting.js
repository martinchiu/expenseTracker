module.exports = {
  localSetting: (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success')
    res.locals.warning_msg = req.flash('warning')
    next()
  }
}