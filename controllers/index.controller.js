// import the data model
import RoomListModel from '../models/roomsList.js'

export default {
  index: function (req, res) {
    RoomListModel.getAllRooms((error, rooms) => {
      if (error) {
        return res.json({
          error: '目前無法連線到資料庫，請等候5分鐘再試，或直接聯繫工程師'
        })
      }

      return res.json(rooms)
    })
  }
}
