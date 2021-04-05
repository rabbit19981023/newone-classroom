import passport from 'passport'

/** Routes Controllers **/
export default {
  loginForm: function (req, res) {
    const data = {
      isAdmin: true,
      isLogin: true,
      message: req.flash('error')
    }

    return res.render('login', { layout: 'loginForm', data: data })
  },

  login: function (req, res) {
    const callback = passport.authenticate('login-admin', {
      successRedirect: '/admin/rooms/audit',
      failureRedirect: '/admin/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  signUpForm: function (req, res) {
    const data = {
      isAdmin: true,
      isSignUp: true,
      message: req.flash('error')
    }

    return res.render('signUp', { layout: 'loginForm', data: data })
  },

  signUp: function (req, res) {
    const callback = passport.authenticate('sign-up-admin', {
      successRedirect: '/admin/rooms/audit',
      failureRedirect: '/admin/sign-up',
      failureFlash: true
    })

    return callback(req, res)
  },

  logOut: function (req, res) {
    req.logOut()

    return res.redirect('/')
  }
}
