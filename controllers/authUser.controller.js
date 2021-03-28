import passport from 'passport'
import isAuth from '../lib/isAuth.js'

/** Routes Controllers **/
export default {
  loginForm: function loginForm(req, res) {
    return res.render('login', { layout: 'loginForm', isAuth: isAuth(req.user, 'User'), isUser: true, isLogin: true, message: req.flash('error') })
  },

  login: function login(req, res) {
    const callback = passport.authenticate('login-user', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  signUpForm: function signUpForm(req, res) {
    return res.render('signUp', { layout: 'loginForm', isAuth: isAuth(req.user, 'User'), isUser: true, isSignUp: true, message: req.flash('error') })
  },

  signUp: function signUp(req, res) {
    const callback = passport.authenticate('sign-up-user', {
      successRedirect: '/',
      failureRedirect: '/sign-up',
      failureFlash: true
    })

    return callback(req, res)
  },

  logOut: function logOut(req, res) {
    req.logOut()

    return res.redirect('/')
  }
}