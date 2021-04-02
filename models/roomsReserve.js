// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a schema for RoomsReserve Model
const roomsReserveSchema = new Schema({
  room_name: String,
  date: Date,
  times: Array,
  user: String,
  purpose: String,
  result: String
})

// compiling our roomsReserveSchema into a RoomsReserve Model instance
const RoomsReserveModel = model('RoomsReserve', roomsReserveSchema)

/** RoomsReserve Model APIs **/
function getAllRoomsReserve (callback) {
  RoomsReserveModel.find().sort({ room_name: 1, date: -1 }).exec((error, roomsReserve) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsReserve)
  })
}

function getRoomsReserve (filter, callback) {
  RoomsReserveModel.find(filter).sort({ date: -1 }).exec((error, roomsReserve) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsReserve)
  })
}

function addRoomsReserve (data, callback) {
  
}

export default {
  getAllRoomsReserve: getAllRoomsReserve,
  getRoomsReserve: getRoomsReserve,
  addRoomsReserve: addRoomsReserve
}

