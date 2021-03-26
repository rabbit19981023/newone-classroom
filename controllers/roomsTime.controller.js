// import data models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

/** global variables for data rendering **/
const timeData = {
  weeks: ['一', '二', '三', '四', '五', '六', '日'],

  times: [
    '0800~0900',
    '0900~1000',
    '1000~1100',
    '1100~1200',
    '1200~1300',
    '1300~1400',
    '1400~1500',
    '1500~1600',
    '1600~1700',
    '1700~1800',
    '1800~1900',
    '1900~2000',
    '2000~2100',
    '2100~2200',
    '2200~2300',
    '2300~2400'
  ]
}

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
  const roomTime = {
    room_name: req.params.room_name,
    weeks: [],
    times: []
  }

  const inputs = req.body.room_time

  try {
    // if (array inputs.length > 1):
    await inputs.forEach(input => {
      input = input.split(',')

      roomTime.weeks.push(input[0])
      roomTime.times.push(input[1])
    })
  }
  catch (error) {
    try {
      // if (array inputs.length == 1):
    const input = inputs.split(',')

    roomTime.weeks.push(input[0])
    roomTime.times.push(input[1])
    }
    catch (error) {
      // this returned roomTime is empty because of a error occured
      return callback(roomTime)
    }
  }

  return callback(roomTime)
}

/** Routes Controller **/
export default {
  timeTable: function (req, res) {
    const path = req.path.split('/')[1]

    const mode = {
      string: '',
      add: false,
      delete: false
    }

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

      if (!req.params.room_name) { return res.render('timeManage', { mode: mode, rooms: allRooms, timeData: timeData }) }

      const roomName = req.params.room_name

      RoomsTimeModel.getRoomTime(roomName, async (error, roomTime) => {
        if (error) { res.render('500error') }

        const data = {}

        if (mode.add) {
          await timeData.times.forEach(time => {
            data[time] = {
              0: true,
              1: true,
              2: true,
              3: true,
              4: true,
              5: true,
              6: true
            }
          })

          await roomTime.forEach(eachRoomTime => {
            eachRoomTime.times.forEach(time => {
              data[time][eachRoomTime.week] = false
            })
          })
        }

        if (mode.delete) {
          await timeData.times.forEach(time => {
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

          await roomTime.forEach(async eachRoomTime => {
            await eachRoomTime.times.forEach(time => {
              data[time][eachRoomTime.week] = true
            })
          })
        }

        return res.render('timeManage', { roomName: roomName, mode: mode, rooms: allRooms, timeData: timeData, data: data })
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
