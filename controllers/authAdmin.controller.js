import passport from 'passport'
import isAuth from '../lib/isAuth.js'

/** Routes Controllers **/
export default {
  loginForm: function loginForm(req, res) {
    return res.render('login', { layout: 'loginForm', isAuth: isAuth(req.user, 'Admin'), isAdmin: true, isLogin: true, message: req.flash('error') })
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

    return res.redirect('/')
  }
}
