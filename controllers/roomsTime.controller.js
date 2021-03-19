// import data models
import RoomsListModel from '../models/roomsList.js'
import RoomsTimeModel from '../models/roomsTime.js'

const data = {
  weeks: {
    Monday: '一',
    Tuesday: '二',
    Wednesday: '三',
    Thursday: '四',
    Friday: '五',
    Saturday: '六',
    Sunday: '日'
  },

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

export default {
  index: function (req, res) {
    RoomsListModel.getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!

      return res.render('roomsTime', { rooms: allRooms, data: data })
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
      if (error) { return res.send('<h1>目前無法連線到伺服器，請等候5分鐘再試！</h1>') }

      if (data) { return res.redirect(`/admin/rooms/time?message=新增教室時段成功！`) }

      res.redirect(`/admin/rooms/time?message=該教室時段已被登錄過囉！`)
    })
  },

  deleteIndex: function (req, res) {
    RoomsTimeModel.getAllRoomsTime((error, roomstime) => {

    })
  },

  deleteTime: function (req, res) {
    const roomTime = {}
    roomTime.room_name = req.body.room_name
    roomTime.week = req.body.week
    roomTime.time = req.body.time

    RoomsTimeModel.deleteTime(roomTime, (error, data) => {

    })
  }
}
