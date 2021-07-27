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
function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const roomsReserve = await RoomsReserveModel.find().sort({ room_name: 1, date: -1 }).exec()

      return resolve(roomsReserve)
    } catch (error) {
      return reject(error)
    }
  })
}

function findMany (filter) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomsReserve = await RoomsReserveModel.find(filter).sort({ room_name: 1, date: -1 }).exec()

      return resolve(roomsReserve)
    } catch (error) {
      return reject(error)
    }
  })
}

function findOne (filter) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomReserve = await RoomsReserveModel.findOne(filter).exec()

      return resolve(roomReserve)
    } catch (error) {
      return reject(error)
    }
  })
}

function add (data) {
  return new Promise(async (resolve, reject) => {
    const newReserve = new RoomsReserveModel({
      room_name: data.room_name,
      date: data.date,
      times: data.room_time,
      status: data.status,
      user: data.user,
      purpose: data.purpose
    })

    try {
      const reserveDoc = await newReserve.save()
      return resolve(reserveDoc)
    } catch (error) {
      return reject(error)
    }
  })
}

function updateOne (filter, content) {
  return new Promise(async (resolve, reject) => {
    try {
      await RoomsReserveModel.updateOne(filter, content).exec()
      return resolve(null)
    } catch (error) {
      return reject(error)
    }
  })
}

export default {
  findAll: findAll,
  findMany: findMany,
  findOne: findOne,
  updateOne: updateOne,
  add: add
}
