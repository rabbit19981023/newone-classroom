import passport from 'passport'
import isLogin from '../lib/isLogin.js'

/** Routes Controllers **/
export default {
  loginForm: function loginForm(req, res) {
    console.log(req.session)
    console.log(req.user)

    res.render('login', { layout: 'loginForm', isLogin: isLogin(req.user, 'Admin'), admin: true, login: true, message: req.flash('error') })
  },

  login: function login(req, res) {
    const callback = passport.authenticate('login-admin', {
      successRedirect: '/admin/rooms/list',
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
