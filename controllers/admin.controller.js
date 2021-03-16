import RoomModelApi from '../models/rooms.js'

/** to ensure all the rooms will display in select.options correctly **/
let data = {}

function getAllRooms (res, callback) {
  RoomModelApi.getAllRooms((error, rooms) => {
    if (error) {
      return res.json({
        error: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師'
      })
    }

    data = JSON.parse(JSON.stringify(rooms)) // reparsing the finded rooms objects

    return callback(data)
  })
}
/** **/

export default {
  newRoom: {
    index: function (req, res) {
      getAllRooms(res, (data) => {
        return res.render('roomsManage', { rooms: data })
      })
    },

    add: function (req, res) {
      const newRoom = {}
      newRoom.room_name = req.body.room_name

      RoomModelApi.addNewRoom(newRoom, (error, existRoom) => {
        if (error) {
          return getAllRooms(res, (data) => {
            res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
          })
        }

        if (existRoom) {
          return getAllRooms(res, (data) => {
            res.render('roomsManage', { rooms: data, message: `${existRoom.room_name}教室已經被登錄過囉！` })
          })
        }

        return getAllRooms(res, (data) => {
          res.render('roomsManage', { rooms: data, message: `${newRoom.room_name}教室已成功登錄！` })
        })
      })
    },

    delete: function (req, res) {
      const roomName = req.body.room_name

      RoomModelApi.deleteRoom(roomName, (error, room) => {
        if (error) {
          return getAllRooms(res, (data) => {
            return res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
          })
        }

        return getAllRooms(res, (data) => {
          return res.redirect('/admin/room?message=' + encodeURIComponent(`${roomName}教室已成功刪除`))
        })
      })
    }
  }
}
