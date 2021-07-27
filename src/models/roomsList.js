// import mongoose
import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for RoomsList Model
const roomsListSchema = new Schema({
  room_name: String
})

// compiling our roomsList Schema into a RoomsList Model instance (same as a RoomsList Collection)
const RoomsListModel = model('RoomsList', roomsListSchema)

/** RoomsList Model APIs **/
function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const rooms = await RoomsListModel.find().sort({ room_name: 1 }).exec()

      return resolve(rooms)
    } catch (error) {
      return reject(error)
    }
  })
}

function add (filter) {
  return new Promise(async (resolve, reject) => {
    try {
      const existRoom = await RoomsListModel.findOne(filter).exec()

      if (existRoom) {
        return resolve(existRoom)
      }

      const roomDoc = new RoomsListModel(filter)

      roomDoc.save().then(() => {
        return resolve(null)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

function deleteOne (filter) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await RoomsListModel.deleteOne(filter)

      return resolve(room)
    } catch (error) {
      return reject(error)
    }
  })
}

export default {
  findAll: findAll,
  add: add,
  deleteOne: deleteOne
}
