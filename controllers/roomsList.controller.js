// import Data Models
import RoomsListModel from '../models/roomsList.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'Admin')
    data.user = parsingUser(req)

    RoomsListModel.findAll((error, rooms) => {
      if (error) { return res.render('500error') }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!
      data.rooms = allRooms

      return res.render('roomsList', { layout: 'admin', data: data })
    })
  },

  addRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomsListModel.add(roomName, (error, existRoom) => {
      if (error) {
        return res.render('500error')
      }

      if (existRoom) {
        return res.redirect(`/admin/rooms/list?message=${existRoom.room_name}教室已經被登錄過囉！`)
      }

      return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功登錄！`)
    })
  },

  deleteRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomsListModel.deleteOne(roomName, (error, room) => {
      if (error) {
        return res.render('500error')
      }

      if (room) {
        return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功刪除！`)
      }
    })
  }
}
