import RoomsListModelApi from '../models/roomsList.js'

export default function (callback) {
  RoomsListModelApi.getAllRooms((error, rooms) => {
    if (error) { return callback(error, null) }

    return callback(null, rooms)
  })
}
