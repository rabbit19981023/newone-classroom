// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomsTime Model (same as RoomsTime Collection)
const roomsTimeSchema = new Schema({
  room_name: String,
  time_data: {
    week: String,
    time: Array
  }
})

// compiling our roomsTimeSchema into a RoomsTime Model instance (same as a RoomsTime Collection)
const RoomsTimeModel = model('RoomsTime', roomsTimeSchema)

/** RoomsTime Model APIs **/
function getAllRoomsTime (callback) {
  RoomsTimeModel.find().sort({ room_name: 1, 'time_data.week': 1 }).exec((error, roomsTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsTime)
  })
}

function getRoomsTime (roomName, callback) {
  RoomsTimeModel.find({ room_name: roomName }, (error, roomsTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsTime)
  })
}

function addTime (data, callback) {
  RoomsTimeModel.findOne({ room_name: data.room_name, 'time_data.week': data.week }, (error, roomTime) => {
    if (error) { return callback(error, null) }

    if (roomTime) {
      if (roomTime.time_data.time.includes(data.time)) {
        return callback(null, null) // no error occurred, the roomTime already exists
      }

      roomTime.time_data.time.push(data.time)
      roomTime.time_data.time.sort()

      return roomTime.save().then(roomTimeDoc => { return callback(null, roomTimeDoc) })
    }

    const roomTimeDoc = new RoomsTimeModel({
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
  getAllRoomsTime: getAllRoomsTime,
  getRoomsTime: getRoomsTime,
  addTime: addTime
}
