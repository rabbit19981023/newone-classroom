// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomTime Model (same as RoomTime Collection)
const roomTimeSchema = new Schema({
  room_name: String,
  time_data: {
    week: String,
    time: Array
  }
})

// compiling our roomTimeSchema into a RoomTime Model instance (same as a RoomTime Collection)
const RoomTimeModel = model('RoomTime', roomTimeSchema)

/** RoomTime Model APIs **/
function getAllRoomTimes (callback) {
  
}

function addTime (data, callback) {
  RoomTimeModel.findOne({ room_name: data.room_name, 'time_data.week': data.week }, (error, roomTime) => {
    if (error) { return callback(error, null) }

    if (roomTime) {
      if (roomTime.time_data.time.includes(data.time)) {
        return callback(null, null) // no error occurred, the roomTime already exists
      }

      roomTime.time_data.time.push(data.time)
      return roomTime.save().then(roomTimeDoc => { return callback(null, roomTimeDoc) })
    }

    const roomTimeDoc = new RoomTimeModel({
      room_name: data.room_name,
      time_data: {
        week: data.week,
        time: data.time
      }
    })

    return roomTimeDoc.save().then(roomTimeDoc => { return callback(null, roomTimeDoc) })
  })
}

function deleteTime (data, callback) {

}

export default {
  addTime: addTime
}
