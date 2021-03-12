// import the data model
import RoomModel from '../models/rooms.js'

export default {
  index: function (req, res) {
    RoomModel.getAllRooms((error, rooms) => {
      if (error) {
        console.error(`Database connecting ERROR:\n${error}`)
      }

      res.json(rooms)
      // res.render('index', { rooms: rooms })
    })
  }
}
