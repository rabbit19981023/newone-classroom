import mongoose from 'mongoose'
const { Schema, model } = mongoose

const roomSchema = new Schema({
	room_id: String,
	data: Object
})

const RoomModel = model('Classrooms', roomSchema)

function getAllRooms (callback) {
  RoomModel.find((error, rooms) => {
    if (error) {
      callback(error, [])
      return
    }

    callback(null, rooms)    
  })
}

function addNewRoom (newRoom, callback) {
  RoomModel.findByOne({ room_id: newRoom.room_id }, (error, room) => {
    if (error) {
      console.error(`Database connecting ERROR:\n${error}`)
    }

    if (room) {
      console.log(`The classroom already exits: ${room}`)
    }

    const roomDoc = new RoomModel({
      room_id: newRoom.room_id,
      data: {}
    })

    roomDoc.save(callback)    
  })
}

function deleteRoom (room, callback) {
  RoomModel.deleteOne({ room_id: room.room_id }, (error) => {
    if (error) {
      console.error(`Database connecting ERROR:\n${error}`)
    }

    console.log(`Deleted successfully!`)
  })
}

function addNewTime (room, callback) {
  RoomModel.findByOne({ room_id: room.room_id }, (error, room) => {
    if (error) {
      console.error(`Database connecting ERROR:\n${error}`)
    }

    // 可能有複寫的問題，造成每間教室只能有一個星期、一個時段
    if (room) {
      RoomModel.updateOne({ room_id: room.room_id }, {
        "data[room.week]": {
          time: room.time
        }
      })
    }

  })
}

function addNewUser (newUser, callback) {

}