import RoomListModelApi from '../models/roomsList.js'

export default {
  roomsManageIndex: function (req, res) {
    RoomListModelApi.getAllRooms((error, rooms) => {
      if (error) {
        return res.json({ error: '目前無法連線到資料庫，請等候5分鐘再試' })
      }

      const allRooms = JSON.parse(JSON.stringify(rooms)) // JSON.parse function is synchronous!

      return res.render('roomsManage', { rooms: allRooms })
    })
  },

  addNewRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomListModelApi.addNewRoom(roomName, (error, existRoom) => {
      if (error) {
        return res.json({ error: '目前無法連線到資料庫，請等候5分鐘再試' })
      }

      if (existRoom) {
        return res.redirect(`/admin/rooms-management?message=${existRoom.room_name}教室已經被登錄過囉！`)
      }

      return res.redirect(`/admin/rooms-management?message=${roomName}教室已成功登錄！`)
    })
  },

  deleteRoom: function (req, res) {
    const roomName = req.body.room_name

    RoomListModelApi.deleteRoom(roomName, (error, room) => {
      if (error) {
        return res.json({ error: '目前無法連線到資料庫，請等候5分鐘再試' })
      }

      return res.redirect(`/admin/rooms-management?message=${roomName}教室已成功刪除`)
    })
  }
}
