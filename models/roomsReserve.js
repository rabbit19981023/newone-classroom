// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a schema for RoomsReserve Model
const roomsReserveSchema = new Schema({
  room_name: String,
  date: String,
  times: Array,
  status: String,
  user: String,
  purpose: String,
  result: String
})

// compiling our roomsReserveSchema into a RoomsReserve Model instance
const RoomsReserveModel = model('RoomsReserve', roomsReserveSchema)

/** RoomsReserve Model APIs **/
function findAll (callback) {
  RoomsReserveModel.find().sort({ room_name: 1, date: -1 }).exec((error, roomsReserve) => {
    if (error) { return callback(error, null) }

    return callback(null, roomsReserve)
  })
}

async function findMany (filter) {
  try {
    const roomsReserve = await RoomsReserveModel.find(filter).sort({ room_name: 1, date: -1 }).exec()

    return new Promise((resolve, reject) => { resolve(roomsReserve) })
  } catch (error) {
    throw error
  }
}

function findOne (filter, callback) {
  RoomsReserveModel.findOne(filter).exec((error, roomReserve) => {
    if (error) { return callback(error, null) }

    return callback(null, roomReserve)
  })
}

function add (data, callback) {
  const reserveDoc = new RoomsReserveModel({
    room_name: data.room_name,
    date: data.date,
    times: data.room_time,
    status: data.status,
    user: data.user,
    purpose: data.purpose
  })

  reserveDoc.save().then(reserveDoc => { return callback(null, reserveDoc) })
}

async function updateOne (filter, content, callback) {
  await RoomsReserveModel.updateOne(filter, content).exec((error, roomReserveDoc) => {
    if (error) { return callback(error) }

    return callback(null)
  })
}

export default {
  findAll: findAll,
  findMany: findMany,
  findOne: findOne,
  updateOne: updateOne,
  add: add
}
