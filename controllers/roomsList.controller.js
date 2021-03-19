// import Data Models
import RoomsListModel from '../models/roomsList.js'

export default {
  index: function (req, res) {
    RoomsListModel.getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>') }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!

      return res.render('roomsList', { rooms: allRooms })
    })
  },

  addRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomsListModel.addRoom(roomName, (error, existRoom) => {
      if (error) {
        return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>')
      }

      if (existRoom) {
        return res.redirect(`/admin/rooms/list?message=${existRoom.room_name}教室已經被登錄過囉！`)
      }

      return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功登錄！`)
    })
  },

  deleteRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomsListModel.deleteRoom(roomName, (error, room) => {
      if (error) {
        return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>')
      }

      return res.redirect(`/admin/rooms/list?message=${roomName}教室已成功刪除！`)
    })
  }
}
