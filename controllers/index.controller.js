// import the Data Models
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'
import timeData from '../lib/timeData.js'


/** Routes Controllers **/
export default {
  index: function (req, res) {
    const user = parsingUser(req)

    return res.render('index', { layout: 'user', user: user })
  },

  roomsReserve: function (req, res) {
    const user = parsingUser(req)

    const data = {
      rooms: []
    }

    RoomsTimeModel.getAllRoomsTime(async (error, roomsTime) => {
      if (error) { return res.render('500error') }

      await roomsTime.forEach((roomTime) => {
        if (!data.rooms.includes(roomTime.room_name)) {
          data.rooms.push(roomTime.room_name)
        }
      })

      return res.render('roomsReserve', { layout: 'user', isAuth: isAuth(req.user, 'User'), user: user, data: data })
    })
  }
}
