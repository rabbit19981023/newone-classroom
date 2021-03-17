// import data models
import RoomsListModelApi from '../models/roomsList.js'
import RoomTimeModelApi from '../models/roomTime.js'

export default {
  index: function (req, res) {
    RoomsListModelApi.getAllRooms((error, rooms) => {
      if (error) { return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試</h1>') }

      rooms = JSON.parse(JSON.stringify(rooms))

      return res.render('roomTimeManage', { rooms: rooms })
    })
  }
}
