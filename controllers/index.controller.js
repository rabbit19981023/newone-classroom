import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'User')
    data.user = parsingUser(req)

    return res.render('index', { layout: 'user', data: data })
  }
}
