import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserModel from '../models/users.js'
import AdminModel from '../models/admin.js'

// serializeUser(序列化)：把admin._id存進seesion裡
// deserializeUser(反序列化)：到session中把admin._id拿出來，到資料庫裡找到對應的admin物件實體
passport.serializeUser((user, callback) => {
  console.log('test1: ' + user) // test

  callback(null, user._id)
})
passport.deserializeUser((id, callback) => {
  UserModel.findById(id, (error, user) => {
    console.log('test2: ' + user) // test

    if (!user) {
      AdminModel.findById(id, (error, admin) => {
        return callback(error, admin)
      })
    }

    return callback(error, user)
  })
})

/** User auth **/
// passport.use(<此驗證機制的名稱>, <採用的驗證策略>)
passport.use('login-user', new LocalStrategy({ passReqToCallback: true }, (req, username, password, callback) => {
  UserModel.findOne({ username: username }, (error, user) => {
    if (error) { return callback(error) }

    if (!user) { return callback(null, false, { message: '帳號不存在，請重新輸入！' }) }

    function isValidPassword(user, password) {
      return bcrypt.compareSync(password, user.password)
    }

    if (!isValidPassword(user, password)) { return callback(null, false, { message: '密碼錯誤，請重新輸入！' }) }

    return callback(null, user)
  })
}))

passport.use('sign-up-user', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, callback) => {
  await UserModel.findOne({ username: username }, (error, user) => {
    if (error) { return callback(error) }

    if (user) { return callback(null, false, { message: '此帳號已經註冊過囉！' }) }

    const newUser = new UserModel({
      user: req.body.user,
      username: username,
      password: bcrypt.hashSync(password, bcypt.genSaltSync(), null)
    })

    newUser.save((error, user) => { return callback(null, user) })
  })
}))

/** Admin Auth **/
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
