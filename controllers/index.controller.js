// import the Data Models
import RoomsListModel from '../models/roomsList.js'

export default {
  index: function (req, res) {
    RoomsListModel.getAllRooms((error, rooms) => {
      if (error) {
        return res.send('<h1>目前無法連線到資料庫，請等候5分鐘再試！</h1>')
      }

      return res.json(rooms)
    })
  }
}
