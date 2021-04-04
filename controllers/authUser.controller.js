import passport from 'passport'

/** Routes Controllers **/
export default {
  loginForm: function (req, res) {
    const data = {
      isUser: true,
      isLogin: true,
      message: req.flash('error')
    }

    return res.render('login', { layout: 'loginForm', data: data })
  },

  login: function (req, res) {
    const callback = passport.authenticate('login-user', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })

    return callback(req, res)
  },

  signUpForm: function (req, res) {
    const data = {
      isUser: true,
      isSignUp: true,
      message: req.flash('error')
    }

    return res.render('signUp', { layout: 'loginForm', data: data })
  },

  signUp: function (req, res) {
    const callback = passport.authenticate('sign-up-user', {
      successRedirect: '/',
      failureRedirect: '/sign-up',
      failureFlash: true
    })

    return callback(req, res)
  },

  logOut: function (req, res) {
    req.logOut()

    return res.redirect('/')
  }
}
