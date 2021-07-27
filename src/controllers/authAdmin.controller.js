import passport from 'passport'

/** Routes Controllers **/
export default {
  // GET '/admin/login'
  loginForm: function (req, res) {
    const data = {
      isAdmin: true,
      isLogin: true,
      message: req.flash('error')
    }

    return res.render('login', { layout: 'loginForm', data: data })
  },

  // POST '/admin/login'
  login: function (req, res) {
    const callback = passport.authenticate('login-admin', {
      successRedirect: '/admin/rooms/audit',
      failureRedirect: '/admin/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  // GET '/admin/sign-up'
  signUpForm: function (req, res) {
    const data = {
      isAdmin: true,
      isSignUp: true,
      message: req.flash('error')
    }

    return res.render('signUp', { layout: 'loginForm', data: data })
  },

  // POST '/admin/sign-up'
  signUp: function (req, res) {
    const callback = passport.authenticate('sign-up-admin', {
      successRedirect: '/admin/rooms/audit',
      failureRedirect: '/admin/sign-up',
      failureFlash: true
    })

    return callback(req, res)
  },

  // GET '/admin/log-out'
  logOut: function (req, res) {
    req.logOut()

    return res.redirect('/')
  }
}
