// import data models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../lib/isAuth.js'
import timeData from '../lib/timeData.js'

/** global functions for module design **/
function getAllRooms (mode, callback) {
  const allRooms = []

  if (mode.add) {
    RoomsListModel.getAllRooms(async (error, rooms) => {
      if (error) { return callback(error, null) }

      await rooms.forEach(room => {
        allRooms.push(room.room_name)
      })

      return callback(null, allRooms)
    })
  }

  if (mode.delete) {
    RoomsTimeModel.getAllRoomsTime(async (error, roomsTime) => {
      if (error) { return callback(error, null) }

      await roomsTime.forEach(roomTime => {
        if (!allRooms.includes(roomTime.room_name)) {
          allRooms.push(roomTime.room_name)
        }
      })

      return callback(null, allRooms)
    })
  }
}

async function getUploadedData (req, callback) {
  const data = {
    room_name: req.params.room_name,
    weeks: [],
    times: []
  }

  const inputs = req.body.room_time

  try {
    // if (array inputs.length > 1):
    await inputs.forEach(input => {
      input = input.split(',')

      data.weeks.push(input[0])
      data.times.push(input[1])
    })
  } catch (error) {
    try {
      // if (array inputs.length == 1):
      const input = inputs.split(',')

      data.weeks.push(input[0])
      data.times.push(input[1])
    } catch (error) {
      // this returned data is empty because of a error occured
      return callback(data)
    }
  }

  return callback(data)
}

/** Routes Controller **/
export default {
  timeTable: function (req, res) {
    const data = {}
    data.timeData = timeData
    data.isAuth = isAuth(req.user, 'Admin')

    const path = req.path.split('/')[1]

    const mode = {
      string: '',
      add: false,
      delete: false
    }
    data.mode = mode

    switch (path) {
      case 'add':
        mode.add = true
        mode.string = 'add'
        break
      case 'delete':
        mode.delete = true
        mode.string = 'delete'
        break
    }

    getAllRooms(mode, (error, allRooms) => {
      if (error) { return res.render('500error') }

      data.rooms = allRooms

      if (!req.params.room_name) { return res.render('timeManage', { layout: 'admin', data: data }) }

      const roomName = req.params.room_name
      data.roomName = roomName

      RoomsTimeModel.getRoomTime({ roomName: roomName }, async (error, roomTime) => {
        if (error) { res.render('500error') }

        data.times = {}

        if (mode.add) {
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
        }

        if (mode.delete) {
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
        }

        return res.render('timeManage', { layout: 'admin', data: data })
      })
    })
  },

  addTime: function (req, res) {
    getUploadedData(req, (roomTime) => {
      RoomsTimeModel.addTime({
        room_name: roomTime.room_name,
        weeks: roomTime.weeks,
        times: roomTime.times
      }, (error) => {
        if (error === '請選擇教室時段！') {
          return res.redirect('/admin/rooms/time/add?message=請選擇教室時段！')
        }

        if (error) { return res.render('500error') }

        return res.redirect('/admin/rooms/time/add?message=新增教室時段成功！')
      })
    })
  },

  deleteTime: function (req, res) {
    getUploadedData(req, (roomTime) => {
      RoomsTimeModel.deleteTime({
        room_name: roomTime.room_name,
        weeks: roomTime.weeks,
        times: roomTime.times
      }, (error) => {
        if (error === '請選擇教室時段！') {
          return res.redirect('/admin/rooms/time/add?message=請選擇教室時段！')
        }

        if (error) { return res.render('500error') }

        return res.redirect('/admin/rooms/time/delete?message=刪除教室時段成功！')
      })
    })
  }
}
