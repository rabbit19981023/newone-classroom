import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import AdminModel from '../models/admin.js'

/** Passport authentication Logics **/

// serializeUser(序列化)：把admin._id存進seesion裡
// deserializeUser(反序列化)：到session中把admin._id拿出來，到資料庫裡找到對應的admin物件實體
passport.serializeUser((admin, callback) => {
  callback(null, admin._id)
})
passport.deserializeUser((id, callback) => {
  AdminModel.findById(id, (error, admin) => {
    callback(error, admin)
  })
})

/** Admin Auth **/
// passport.use(<此驗證機制的名稱>, <採用的驗證策略>)
passport.use('login-admin', new LocalStrategy({ passReqToCallback: true }, (req, username, password, callback) => {
  AdminModel.findOne({ username: username }, (error, admin) => {
    if (error) { return callback(error) }

    if (!admin) { return callback(null, false, { message: '帳號不存在，請重新輸入！' }) }

    function isValidPassword (admin, password) {
      return bcrypt.compareSync(password, admin.password)
    }

    if(!isValidPassword) { return callback(null, false, { message: '密碼錯誤！請重新輸入！' }) }

    return callback(null, admin)
  })
}))

export default passport
