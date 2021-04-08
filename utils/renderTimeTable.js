// Import Data Models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

import timeData from './timeData.js'

// Custom Strategies
class AddStrategy {
  use (req, res, data) {
    data.timeData = timeData

    const allRooms = []

    RoomsListModel.findAll(async (error, rooms) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      await rooms.forEach(room => {
        allRooms.push(room.room_name)
      })

      data.rooms = allRooms

      if (!req.params.room_name) { return res.render('timeManage', { layout: 'admin', data: data }) }

      const roomName = req.params.room_name
      data.roomName = roomName

      RoomsTimeModel.findMany({ room_name: roomName }, async (error, roomTime) => {
        if (error) { res.render('500error', { layout: 'error' }) }

        data.times = {}

        await timeData.times.forEach(time => {
          data.times[time] = {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true
          }
        })

        await roomTime.forEach(async eachRoomTime => {
          await eachRoomTime.times.forEach(time => {
            data.times[time][eachRoomTime.week] = false
          })
        })

        return res.render('timeManage', { layout: 'admin', data: data })
      })
    })
  }
}

class DeleteStrategy {
  use (req, res, data) {
    data.timeData = timeData

    const allRooms = []

    RoomsTimeModel.findAll(async (error, roomsTime) => {
      if (error) { return res.render('timeManage', { layout: 'admin', data: data }) }

      await roomsTime.forEach(roomTime => {
        const roomName = roomTime.room_name

        if (!allRooms.includes(roomName)) {
          allRooms.push(roomName)
        }
      })

      data.rooms = allRooms

      if (!req.params.room_name) { return res.render('timeManage', { layout: 'admin', data: data }) }

      const roomName = req.params.room_name
      data.roomName = roomName

      RoomsTimeModel.findMany({ room_name: roomName }, async (error, roomTime) => {
        if (error) { res.render('500error', { layout: 'error' }) }

        data.times = {}

        await timeData.times.forEach(time => {
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

        await roomTime.forEach(async eachRoomTime => {
          await eachRoomTime.times.forEach(time => {
            data.times[time][eachRoomTime.week] = true
          })
        })

        return res.render('timeManage', { layout: 'admin', data: data })
      })
    })
  }
}

class ReserveStrategy {
  use (req, res, data) {
    data.timeData = timeData

    RoomsTimeModel.findAll(async (error, roomsTime) => {
      if (error) { return res.render('500error') }

      const allRooms = []

      await roomsTime.forEach((roomTime) => {
        if (!allRooms.includes(roomTime.room_name)) {
          allRooms.push(roomTime.room_name)
        }
      })

      data.rooms = allRooms

      if (!req.query.room_name) { return res.render('roomsReserve', { layout: 'user', data: data }) }

      const roomName = req.query.room_name
      const roomDate = req.query.date
      const roomWeek = new Date(roomDate).getDay().toString()

      data.roomName = roomName

      RoomsTimeModel.findMany({ room_name: roomName, week: roomWeek }, async (error, roomTime) => {
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
  }
}

// Strategies Context
const timeTableStrategies = {
  add: new AddStrategy(),
  delete: new DeleteStrategy(),
  reserve: new ReserveStrategy()
}

// Strategy Controller
export default function renderTimeTable (req, res, data, type) {
  const strategy = timeTableStrategies[type]

  strategy.use(req, res, data)
}
