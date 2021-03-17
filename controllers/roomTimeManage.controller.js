// import data models
import roomTimeModelApi from '../models/roomTime.js'

// import getAllRooms to display all classrooms
import getAllRooms from '../lib/getAllRooms.js'

export default {
  index: function (req, res) {
    getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試</h1>') }

      rooms = JSON.parse(JSON.stringify(rooms))

      return res.render('roomTimeManage', { rooms: rooms })
    })
  }
}
