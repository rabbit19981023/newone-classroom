// import the Data Models
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'
import timeData from '../lib/timeData.js'
import EventEmitter from 'node:events'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const user = parsingUser(req)

    return res.render('index', { layout: 'user', isAuth: isAuth(req.user, 'User'), user: user })
  },

  roomsReserve: function (req, res) {
    const user = parsingUser(req)

    RoomsTimeModel.getAllRoomsTime(async (error, roomsTime) => {
      if (error) { return res.render('500error') }

      const allRooms = []

      await roomsTime.forEach((roomTime) => {
        if (!allRooms.includes(roomTime.room_name)) {
          allRooms.push(roomTime.room_name)
        }
      })

      if (!req.params.room_name) { return res.render('roomsReserve', { layout: 'user', isAuth: isAuth(req.user, 'User'), user: user, rooms: allRooms, timeData: timeData, }) }

      const roomName = req.params.room_name

      RoomsTimeModel.getRoomTime(roomName, async (error, roomTime) => {
        if (error) { return res.render('500error') }

        const data = {}

        await timeData.times.forEach((time) => {
          data[time] = {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
          }
        })

        await roomTime.forEach(async (eachRoomTime) => {
          await eachRoomTime.times.forEach((time) => {
            data[time][eachRoomTime.week] = true
          })
        })
        
        return res.render('roomsReserve', { layout: 'user', isAuth: isAuth(req.user, 'User'), user: user, roomName: roomName, rooms: allRooms, timeData: timeData, data: data })
      })
    })
  }
}
