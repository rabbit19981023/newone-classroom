import RoomApi from '../models/rooms.js'

// to ensure all the rooms will display in select.options correctly
let data = {}

function allRoomsDisplay (callback) {
  RoomApi.getAllRooms((error, rooms) => {
    if (error) {
      return res.redirect('/admin/room?message=' + encodeURIComponent('目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師'))
    }

    data = JSON.parse(JSON.stringify(rooms)) // reparsing the finded rooms objects

    return callback(data)
  })
}

export default {
  newRoom: {
    index: function (req, res) {
      allRoomsDisplay((data) => {
        return res.render('roomsManage', { rooms: data })
      })
      return
    },

    add: function (req, res) {
      const newRoom = {}
      newRoom.room_name = req.body.room_name

      RoomApi.addNewRoom(newRoom, (error, existRoom) => {
        if (error) {
          return allRoomsDisplay((data) => {
            res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
          })
          
        }

        if (existRoom) {
          return allRoomsDisplay((data) => {
            res.render('roomsManage', { rooms: data, message: `${existRoom.room_name}教室已經被登錄過囉！` })
          })          
        }
        
        return allRoomsDisplay((data) => {
          res.render('roomsManage', { rooms: data, message: `${newRoom.room_name}教室已成功登錄！` })
        })
      })
      return      
    },

    delete: function (req, res) {    
      const roomName = req.body.room_name

      RoomApi.deleteRoom(roomName, (error, room) => {
        if (error) {
          return allRoomsDisplay((data) => {
            return res.render('roomsManage', { rooms: data, message: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師' })
          })          
        }
        
        return allRoomsDisplay((data) => {
          return res.redirect('/admin/room?message=' + encodeURIComponent(`${roomName}教室已成功刪除`))
        })        
      })      
      return
    },
  }
}
