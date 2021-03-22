// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomsTime Model (same as RoomsTime Collection)
const roomsTimeSchema = new Schema({
  room_name: String,
  week: String,
  times: Array
})

// compiling our roomsTimeSchema into a RoomsTime Model instance (same as a RoomsTime Collection)
const RoomsTimeModel = model('RoomsTime', roomsTimeSchema)

/** RoomsTime Model APIs **/
function getAllRoomsTime(callback) {
  RoomsTimeModel.find().sort({ room_name: 1, week: 1 }).exec((error, roomsTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsTime)
  })
}

function getRoomsTime(roomName, callback) {
  RoomsTimeModel.find({ room_name: roomName }, (error, roomsTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsTime)
  })
}

function addTime(data, callback) {
  RoomsTimeModel.findOne({ room_name: data.room_name, week: data.week }, (error, roomTime) => {
    if (error) { return callback(error, null) }

    if (roomTime) {
      if (roomTime.times.includes(data.time)) {
        return callback(null, null) // no error occurred, the roomTime already exists
      }

      roomTime.times.push(data.time)
      roomTime.times.sort()

      return roomTime.save().then(roomTimeDoc => { return callback(null, roomTimeDoc) })
    }

    const roomTimeDoc = new RoomsTimeModel({
      room_name: data.room_name,
      week: data.week,
      times: data.time
    })

    return roomTimeDoc.save().then(roomTimeDoc => { return callback(null, roomTimeDoc) })
  })
}

async function deleteTime(data, callback) {
  let error = null

  for (let i = 0; i < data.times.length; i++) {
    await RoomsTimeModel.findOne({ room_name: data.room_name, week: data.weeks[i] }, async (err, roomTime) => {
      if (err) {
        error = err
        return
      }

      const deleteIndex = roomTime.times.indexOf(data.times[i])
      roomTime.times.splice(deleteIndex, 1)

      await roomTime.save()
    })

    if (error) { break }
  }

  return callback(error)
}

export default {
  getAllRoomsTime: getAllRoomsTime,
  getRoomsTime: getRoomsTime,
  addTime: addTime,
  deleteTime: deleteTime
}
