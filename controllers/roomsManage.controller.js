// import Data Models
import RoomsListModelApi from '../models/roomsList.js'

export default {
  index: function (req, res) {
    RoomsListModelApi.getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試</h1>') }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse is synchronous!

      return res.render('roomsManage', { rooms: allRooms })
    })
  },

  addNewRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomListModelApi.addNewRoom(roomName, (error, existRoom) => {
      if (error) {
        return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試</h1>')
      }

      if (existRoom) {
        return res.redirect(`/rooms-manage/index?message=${existRoom.room_name}教室已經被登錄過囉！`)
      }

      return res.redirect(`/rooms-manage/index?message=${roomName}教室已成功登錄！`)
    })
  },

  deleteRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomListModelApi.deleteRoom(roomName, (error, room) => {
      if (error) {
        return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試</h1>')
      }

      return res.redirect(`/rooms-manage/index?message=${roomName}教室已成功刪除`)
    })
  }
}
