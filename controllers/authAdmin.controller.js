import passport from 'passport'

/** Routes Controllers **/
export default {
  loginForm: function loginForm(req, res) {
    console.log(req.session)
    console.log(req.user)
    res.render('login', { layout: 'loginForm', test: req.isAuthenticated(), admin: true, login: true, message: req.flash('error') })
  },

  login: function login(req, res) {
    const callback = passport.authenticate('login-admin', {
      successRedirect: '/admin/login',
      failureRedirect: '/admin/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  logOut: function logOut(req, res) {
    req.logOut()
    res.redirect('/')
  }
}