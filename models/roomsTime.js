// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomsTime Model
const roomsTimeSchema = new Schema({
  room_name: String,
  week: String,
  times: Array
})

// compiling our roomsTimeSchema into a RoomsTime Model instance (same as a RoomsTime Collection)
const RoomsTimeModel = model('RoomsTime', roomsTimeSchema)

/** RoomsTime Model APIs **/
function getAllRoomsTime (callback) {
  RoomsTimeModel.find().sort({ room_name: 1, week: 1 }).exec((error, roomsTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsTime)
  })
}

function getRoomTime (roomName, callback) {
  RoomsTimeModel.find({ room_name: roomName }, (error, roomTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomTime)
  })
}

async function addTime (data, callback) {
  /**
  
  data = {
    room_name: String,
    weeks: Array,
    times: Array
  }

  **/

  let error = null

  if (data.times.length === 0) {
    error = "請選擇教室時段！"
    return callback(error)
  }

  for (let i = 0; i < data.times.length; i++) {
    await RoomsTimeModel.findOne({ room_name: data.room_name, week: data.weeks[i] }, async (err, roomTime) => {
      if (err) {
        error = err
        return
      }

      if (roomTime) {
        if (roomTime.times.includes(data.times[i])){
          return
        }

        return await RoomsTimeModel.updateOne({ room_name: data.room_name, week: data.weeks[i] }, { $addToSet: { times: data.times[i] } })
      }

      const roomTimeDoc = new RoomsTimeModel({
        room_name: data.room_name,
        week: data.weeks[i],
        times: data.times[i]
      })

      return await roomTimeDoc.save()
    })

    if (error) { break }
  }

  return callback(error)
}

async function deleteTime (data, callback) {
  /**
  
  data = {
    room_name: String,
    weeks: Array,
    times: Array
  }

  **/

  let error = null

  if (data.times.length === 0) {
    error = "請選擇教室時段！"
    return callback(error)
  }

  for (let i = 0; i < data.times.length; i++) {
    await RoomsTimeModel.findOne({ room_name: data.room_name, week: data.weeks[i] }, async (err, roomTime) => {
      if (err) {
        error = err
        return
      }

      return await roomTime.updateOne({ $pull: { times: data.times[i] } })
    })

    if (error) { break }
  }

  return callback(error)
}

export default {
  getAllRoomsTime: getAllRoomsTime,
  getRoomTime: getRoomTime,
  addTime: addTime,
  deleteTime: deleteTime
}
