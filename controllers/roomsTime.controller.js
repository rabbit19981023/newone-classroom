// import data models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

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

function getAllRoomsTime (callback) {
  RoomsTimeModel.getAllRoomsTime((error, roomsTime) => {
    const rooms = []

    roomsTime.forEach((roomTime) => {
      if (!rooms.includes(roomTime.room_name)) {
        rooms.push(roomTime.room_name)
        rooms.sort()
      }
    })

    return callback(error, rooms)
  })
}

export default {
  index: function (req, res) {
    RoomsListModel.getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!

      return res.render('roomsTime', { rooms: allRooms, timeData: timeData })
    })
  },

  addTime: function (req, res) {
    const roomTime = {}
    roomTime.room_name = req.body.room_name
    roomTime.week = req.body.week
    roomTime.time = req.body.time

    if (roomTime.room_name === 'null') {
      return res.redirect('/admin/rooms/time?message=請選擇教室！')
    }

    RoomsTimeModel.addTime(roomTime, (error, data) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

      if (data) { return res.redirect('/admin/rooms/time?message=新增教室時段成功！') }

      res.redirect('/admin/rooms/time?message=該教室時段已被登錄過囉！')
    })
  },

  deleteIndex: function (req, res) {
    if (!req.params.room_name) {
      getAllRoomsTime((error, rooms) => {
        if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

        return res.render('roomsTimeDeleteIndex', { rooms: rooms, timeData: timeData })
      })
      return
    }

    getAllRoomsTime((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

      const roomName = req.params.room_name

      RoomsTimeModel.getRoomsTime(roomName, (error, roomsTime) => {
        if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

        const data = {}

        timeData.times.forEach((time) => {
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

        roomsTime.forEach((roomTime) => {
          roomTime.times.forEach((time) => {
            data[time][roomTime.week] = true
          })
        })

        return res.render('roomsTimeDelete', { rooms: rooms, roomName: roomName, data: data, timeData: timeData })
      })
    })
  },
  
  deleteTime: function (req, res) {
    const roomName = req.params.room_name
    let weeks = []
    let times = []

    const inputs = req.body.rooms_time
    try {
      inputs.forEach((input) => {
        input = input.split(',')
        weeks.push(input[0])
        times.push(input[1])
      })
    } catch (error) {
      const input = inputs.split(',')
      weeks.push(input[0])
      times.push(input[1])
    }
    
    RoomsTimeModel.deleteTime({
      room_name: roomName,
      weeks: weeks,
      times: times
    }, (error) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }
      
      return res.redirect('/admin/rooms/time/delete?message=刪除教室時段成功！')
    })
  }
}
