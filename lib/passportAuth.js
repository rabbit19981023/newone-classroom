import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserModel from '../models/users.js'

// serializeUser(序列化)：把user._id存進seesion裡
// deserializeUser(反序列化)：到session中把user._id拿出來，到資料庫裡找到對應的user物件實體
passport.serializeUser((user, callback) => {
  return callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
  UserModel.findById(id, (error, user) => {
    return callback(error, user)
  })
})

/** Define custom auth strategies **/
class LoginStrategy {
  use(name, role) {
    passport.use(name, new LocalStrategy((username, password, callback) => {
      UserModel.findOne({ username: username, role: role }, (error, user) => {
        if (error) { return callback(error) }
    
        if (!user) { return callback(null, false, { message: '帳號不存在，請重新輸入！' }) }
    
        function isValidPassword (user, password) {
          return bcrypt.compareSync(password, user.password)
        }
    
        if (!isValidPassword(user, password)) { return callback(null, false, { message: '密碼錯誤，請重新輸入！' }) }
    
        return callback(null, user)
      })
    }))
  }
}

class SignUpStrategy {
  use(name, role) {
    passport.use(name, new LocalStrategy({ passReqToCallback: true }, async (req, username, password, callback) => {
      await UserModel.findOne({ username: username, role: role }, (error, user) => {
        if (error) { return callback(error) }
    
        if (user) { return callback(null, false, { message: '此帳號已經註冊過囉！' }) }
    
        const newUser = new UserModel({
          user: req.body.user,
          role: role,
          username: username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(), null)
        })
    
        newUser.save((error, user) => {
          if (error) { return callback(null, false, { message: '資料庫處理失敗，請稍後再試，並回報工程師協助調查此錯誤(重要！)' }) }
    
          return callback(null, user)
        })
      })
    }))
  }
}

const Strategies = {
  login: new LoginStrategy(),
  signUp: new SignUpStrategy()
}

function registerAuth(type, name, role) {
  const strategy = Strategies[type]

  strategy.use(name, role)
}

registerAuth('login', 'login-user', 'User')
registerAuth('signUp', 'sign-up-user', 'User')

registerAuth('login', 'login-admin', 'Admin')
registerAuth('signUp', 'sign-up-admin', 'Admin')

export default passport
