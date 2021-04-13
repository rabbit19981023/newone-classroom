// import Data Models
import RoomsListModel from '../models/roomsList.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: async function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'Admin')
    data.user = parsingUser(req.user)

    try {
      const rooms = await RoomsListModel.findAll()

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!
      data.rooms = allRooms

      return res.render('roomsList', { layout: 'admin', data: data })
    } catch (error) { return res.render('500error') }
  },

  addRoom: async function (req, res) {
    const roomName = req.body.room_name

    try {
      const existRoom = await RoomsListModel.add(roomName)

      if (existRoom) {
        return res.redirect(`/admin/rooms/list?message=${existRoom.room_name}教室已經被登錄過囉！`)
      }

      return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功登錄！`)
    } catch (error) { return res.render('500error', { layout: 'error' }) }
  },

  deleteRoom: async function (req, res) {
    const roomName = req.body.room_name

    try {
      const room = await RoomsListModel.deleteOne(roomName)

      if (room) {
        return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功刪除！`)
      }
    } catch (error) { return res.render('500error', { layout: 'error' }) }
  }
}
