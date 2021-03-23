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

function getRoomTime(roomName, callback) {
  RoomsTimeModel.find({ room_name: roomName }, (error, roomTime) => {
    if (error) { return callback(error, null) }

    return callback(null, roomTime)
  })
}

async function addTime(data, callback) {
  let error = null

  for (let i = 0; i < data.times.length; i++) {
    await RoomsTimeModel.findOne({ room_name: data.room_name, week: data.weeks[i] }, async (err, roomTime) => {
      if (err) {
        error = err
        return
      }

      if (roomTime) {
        if (roomTime.times.includes(data.times[i])) {
          return
        }

        roomTime.times.push(data.times[i])
        await roomTime.times.sort()
        
        return await roomTime.save()
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

async function deleteTime(data, callback) {
  let error = null

  for (let i = 0; i < data.times.length; i++) {
    await RoomsTimeModel.findOne({ room_name: data.room_name, week: data.weeks[i] }, async (err, roomTime) => {
      if (err) {
        error = err
        return
      }

      const deleteIndex = await roomTime.times.indexOf(data.times[i])
      await roomTime.times.splice(deleteIndex, 1)

      await roomTime.save()
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
