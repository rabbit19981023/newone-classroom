// import the Data Models
import RoomsListModel from '../models/roomsList.js'

export default {
  index: function (req, res) {
    RoomsListModel.getAllRooms((error, rooms) => {
      if (error) {
        return res.render('500error')
      }

      return res.json(rooms)
    })
  }
}
