// import the Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'User')
    data.user = parsingUser(req)

    return res.render('index', { layout: 'user', data: data })
  }
}
