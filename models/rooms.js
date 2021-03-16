// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a schema for our Classroom collection
const roomSchema = new Schema({
  room_name: String,
  data: Object
})

// compiling our classroom schema into Classroom Model (Classroom collection)
const RoomModel = model('Classrooms', roomSchema)

/** Classroom Model APIs **/
function getAllRooms (callback) {
  RoomModel.find().sort('room_name').exec((error, rooms) => {
    if (error) {
      return callback(error, null)
    }

    return callback(null, rooms)
  })
}

function addNewRoom (newRoom, callback) {
  RoomModel.findOne({ room_name: newRoom.room_name }, (error, room) => {
    if (error) {
      return callback(error, null)
    }

    if (room) {
      return callback(null, room)
    }

    const roomDoc = new RoomModel({
      room_name: newRoom.room_name,
      data: {}
    })

    roomDoc.save().then((roomDoc) => {
      return callback(null, null) // no error, no room exists
    })
  })
}

function deleteRoom (roomName, callback) {
  RoomModel.deleteOne({ room_name: roomName }, (error, room) => {
    if (error) {
      return callback(error, null)
    }

    return callback(null, room)
  })
}

function addNewTime (room, callback) {

}

function addNewUser (newUser, callback) {

}

// export all the Classroom Model APIs
export default {
  getAllRooms: getAllRooms,
  addNewRoom: addNewRoom,
  deleteRoom: deleteRoom,
  addNewTime: addNewTime,
  addNewUser: addNewUser
}
