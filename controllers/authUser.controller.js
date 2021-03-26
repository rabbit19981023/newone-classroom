import passport from 'passport'

/** Routes Controllers **/
export default {
  loginForm: function loginForm(req, res) {
    console.log(req.session)
    console.log(req.user)
    res.render('login', { layout: 'loginForm', test: req.isAuthenticated(), user: true, login: true, message: req.flash('error') })
  },

  login: function login(req, res) {
    const callback = passport.authenticate('login-user', {
      successRedirect: '/login',
      failureRedirect: '/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  signUpForm: function signUpForm(req, res) {
    res.render('signUp', { layout: 'loginForm', user: true, signUp: true, message: req.flash('error') })
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
    res.redirect('/')
  }
}