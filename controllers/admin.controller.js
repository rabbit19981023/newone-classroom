import RoomApi from '../models/rooms.js'

// to ensure all the rooms will display in select.options correctly
let data = {}

function allRoomsDisplay () {
  RoomApi.getAllRooms((error, rooms) => {
    if (error) {
      return res.redirect('/admin/room?message=' + encodeURIComponent('目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師'))
    }

    data = JSON.parse(JSON.stringify(rooms)) // reparsing the finded rooms objects
  })
}

export default {
  newRoom: {
    index: function (req, res) {
      allRoomsDisplay()
      return res.render('roomsManage', { rooms: data })
    },

    add: function (req, res) {
      allRoomsDisplay()

      const newRoom = {}
      newRoom.room_id = req.body.room_id

      RoomApi.addNewRoom(newRoom, (error, existRoom) => {
        if (error) {
          return res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
        }

        if (existRoom) {
          return res.render('roomsManage', { rooms: data, message: `${existRoom.room_id}教室已經被登錄過囉！` })          
        }

        return res.render('roomsManage', { rooms: data, message: `${newRoom.room_id}教室已成功登錄！` })
      })
    },

    delete: function (req, res) {
      allRoomsDisplay()

      const roomId = req.body.room_id

      RoomApi.deleteRoom(roomId, (error, room) => {
        if (error) {
          return res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
        }
        
        return res.redirect('/admin/room?message=' + encodeURIComponent(`${roomId}教室已成功刪除`))
      })
    },
  }
}
