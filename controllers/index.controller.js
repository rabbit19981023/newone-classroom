// import the Data Models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'
import timeData from '../lib/timeData.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    return res.render('index', { layout: 'user', isAuth: isAuth(req.user, 'User'), user: user })
  },

  roomsReserve: function (req, res) {
    
  }
}
