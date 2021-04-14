// Import Data Models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'
import RoomsReserveModel from '../models/roomsReserve.js'

import timeData from './timeData.js'

// Custom Strategies
class AddStrategy {
  async use (req, res, data) {
    data.timeData = timeData

    const allRooms = []

    try {
      const rooms = await RoomsListModel.findAll()

      rooms.forEach(room => {
        allRooms.push(room.room_name)
      })

      data.rooms = allRooms

      if (!req.params.room_name) { return res.render('timeManage', { layout: 'admin', data: data }) }

      const roomName = req.params.room_name
      data.roomName = roomName

      try {
        const roomTime = await RoomsTimeModel.findMany({ room_name: roomName })

        data.times = {}

        timeData.times.forEach(time => {
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

        roomTime.forEach(eachRoomTime => {
          eachRoomTime.times.forEach(time => {
            data.times[time][eachRoomTime.week] = false
          })
        })

        return res.render('timeManage', { layout: 'admin', data: data })
      } catch (error) {
        return res.render('500error', { layout: 'error' })
      }
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }
  }
}

class DeleteStrategy {
  async use (req, res, data) {
    data.timeData = timeData

    const allRooms = []

    try {
      const roomsTime = await RoomsTimeModel.findAll()

      roomsTime.forEach(roomTime => {
        const roomName = roomTime.room_name

        if (!allRooms.includes(roomName)) {
          allRooms.push(roomName)
        }
      })

      data.rooms = allRooms

      if (!req.params.room_name) { return res.render('timeManage', { layout: 'admin', data: data }) }

      const roomName = req.params.room_name
      data.roomName = roomName

      try {
        const roomTime = await RoomsTimeModel.findMany({ room_name: roomName })

        data.times = {}

        timeData.times.forEach(time => {
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

        roomTime.forEach(eachRoomTime => {
          eachRoomTime.times.forEach(time => {
            data.times[time][eachRoomTime.week] = true
          })
        })

        return res.render('timeManage', { layout: 'admin', data: data })
      } catch (error) {
        res.render('500error', { layout: 'error' })
      }
    } catch (error) {
      return res.render('timeManage', { layout: 'admin', data: data })
    }
  }
}

class ReserveStrategy {
  async use (req, res, data) {
    data.timeData = timeData

    try {
      const roomsTime = await RoomsTimeModel.findAll()

      const allRooms = []

      roomsTime.forEach((roomTime) => {
        const roomName = roomTime.room_name

        if (!allRooms.includes(roomName)) {
          allRooms.push(roomName)
        }
      })

      data.rooms = allRooms

      if (!req.query.room_name) { return res.render('roomsReserve', { layout: 'user', data: data }) }

      const roomName = req.query.room_name
      const roomDate = req.query.date
      const roomWeek = new Date(roomDate).getDay().toString()

      data.roomName = roomName

      try {
        const roomTime = await RoomsTimeModel.findMany({ room_name: roomName, week: roomWeek })

        data.times = {}

        timeData.times.forEach((time) => {
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

        roomTime[0].times.forEach((time) => {
          data.times[time][roomWeek] = true
        })

        try {
          const roomsReserve = await RoomsReserveModel.findMany({
            room_name: roomName,
            date: roomDate,
            status: '已被借用'
          })

          roomsReserve.forEach(eachReserve => {
            eachReserve.times.forEach(time => {
              data.times[time][roomWeek] = false
            })
          })

          return res.render('roomsReserve', { layout: 'user', data: data })
        } catch (error) {
          res.render('500error', { layout: 'error' })
        }
      } catch (error) {
        return res.render('500error', { layout: 'error' })
      }
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }
  }
}

// Strategies Context
const timeTableStrategies = {
  add: AddStrategy,
  delete: DeleteStrategy,
  reserve: ReserveStrategy
}

// Strategy Controller
export default function renderTimeTable (req, res, data, strategyUsed) {
  const strategy = new timeTableStrategies[strategyUsed]()

  strategy.use(req, res, data)
}
