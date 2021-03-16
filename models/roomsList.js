// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomsList Model (same as RoomsList collection)
const roomsListSchema = new Schema({
  room_name: String
})

// compiling our roomsListSchema into a RoomsList Model instance (same as a RoomsList Collection)
const RoomsListModel = model('RoomsList', roomsListSchema)

/** RoomsList Model APIs **/
function getAllRooms (callback) {
  RoomsListModel.find().sort('room_name').exec((error, rooms) => {
    if (error) { return callback(error, null) }

    return callback(null, rooms)
  })
}

function addNewRoom (roomName, callback) {
  RoomsListModel.findOne({ room_name: roomName }, (error, room) => {
    if (error) { return callback(error, null) }

    if (room) { return callback(null, room) }

    const roomDoc = new RoomsListModel({ room_name: roomName })

    roomDoc.save().then((roomDoc) => { return callback(null, null) }) // no error occured, no room exists
  })
}

function deleteRoom (roomName, callback) {
  RoomsListModel.deleteOne({ room_name: roomName }, (error, room) => {
    if (error) { return callback(error, null) }

    return callback(null, room)
  })
}

export default {
  getAllRooms: getAllRooms,
  addNewRoom: addNewRoom,
  deleteRoom: deleteRoom
}
