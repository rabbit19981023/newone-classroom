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

class indexStrategy {
  async use (req, res, data) {
    const filter = {
      status: '已被借用'
    }

    if (req.query.room_name) {
      filter.room_name = req.query.room_name

      data.roomName = req.query.room_name
    }

    if (req.query.date) {
      let sunday, monday, tuesday, wednesday, thursday, friday, saturday
      const dates = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]

      const date = new Date(req.query.date)
      const weekDay = date.getUTCDay()

      function createDates (date) {
        for (let i = 0; i < dates.length; i++) {
          dates[i] = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() - (weekDay - i)
          ))

          const str = dates[i].toJSON()
          dates[i] = str.split('T')[0]
        }
      }
      createDates(date)
      data.dates = dates

      data.timeData = timeData

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

      for (let i = 0; i < dates.length; i++) {
        filter.date = dates[i]

        try {
          const roomsReserve = await RoomsReserveModel.findMany(filter)

          roomsReserve.forEach(eachReserve => {
            eachReserve.times.forEach(time => {
              data.times[time][i] = true
            })
          })
        } catch (error) {
          return res.render('500error', { layout: 'error' })
        }
      }
    }

    return res.render('index', { layout: 'user', data: data })
  }
}

// Strategies Context
const timeTableStrategies = {
  add: AddStrategy,
  delete: DeleteStrategy,
  reserve: ReserveStrategy,
  index: indexStrategy
}

// Strategy Controller
export default function renderTimeTable (req, res, data, strategyUsed) {
  const strategy = new timeTableStrategies[strategyUsed]()

  strategy.use(req, res, data)
}
