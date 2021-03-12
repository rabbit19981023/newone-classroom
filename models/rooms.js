// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a schema for our Classroom collection
const roomSchema = new Schema({
  room_id: String,
  data: Object
})

// compiling our classroom schema into Classroom Model (Classroom collection)
const RoomModel = model('Classrooms', roomSchema)

/** Classroom Model APIs **/
function getAllRooms (callback) {
  RoomModel.find().sort('room_id').exec((error, rooms) => {
    if (error) {
      return callback(error, null)      
    }

    return callback(null, rooms)
  })
}

async function addNewRoom (newRoom, callback) {
  RoomModel.findOne({ room_id: newRoom.room_id }, (error, room) => {
    if (error) {
      return callback(error, null)
    }

    if (room) {
      return callback(null, room)
    }
  })

  const roomDoc = new RoomModel({
    room_id: newRoom.room_id,
    data: {}
  })

  await roomDoc.save()

  return callback(null, null) // no error, no room exists
}

function deleteRoom (roomId, callback) {
  RoomModel.deleteOne({ room_id: roomId }, (error, room) => {
    if (error) {
      return callback(error, null)
    }

    console.log(room)
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
