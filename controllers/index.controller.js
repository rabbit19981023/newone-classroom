// import the Data Models
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'
import timeData from '../lib/timeData.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'User')
    data.user = parsingUser(req)

    return res.render('index', { layout: 'user', data: data })
  },

  roomsReserve: function (req, res) {
    const data = {}
    data.user = parsingUser(req)
    data.isAuth = isAuth(req.user, 'User')

    RoomsTimeModel.getAllRoomsTime(async (error, roomsTime) => {
      if (error) { return res.render('500error') }

      data.timeData = timeData

      const allRooms = []

      await roomsTime.forEach((roomTime) => {
        if (!allRooms.includes(roomTime.room_name)) {
          allRooms.push(roomTime.room_name)
        }
      })

      data.allRooms = allRooms

      if (!req.query.room_name) { return res.render('roomsReserve', { layout: 'user', data: data }) }
      const roomName = req.query.room_name
      const roomDate = req.query.date
      const roomWeek = new Date(roomDate).getDay().toString()

      data.roomName = roomName

      RoomsTimeModel.getRoomTime({ roomName: roomName, roomWeek: roomWeek }, async (error, roomTime) => {
        if (error) { return res.render('500error') }

        data.times = {}

        await timeData.times.forEach((time) => {
          data.times[time] = {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
          }
        })
        
        await roomTime[0].times.forEach((time) => {
          data.times[time][roomWeek] = true
        })
        
        return res.render('roomsReserve', { layout: 'user', data: data })
      })
    })
  },

  add: function (req, res) {
    console.log(req.body)
  }
}
