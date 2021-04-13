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
async function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const rooms = await RoomsListModel.find().sort({ room_name: 1 }).exec()
  
      return resolve(rooms)
    } catch (error) {
      return reject(error)
    }
  })
}

async function add (roomName) {
  return new Promise(async (resolve, reject) => {
    try {
      const existRoom = await RoomsListModel.findOne({ room_name: roomName }).exec()
  
      if (existRoom) {
        return resolve(existRoom)
      }
  
      const roomDoc = new RoomsListModel({ room_name: roomName })
  
      roomDoc.save().then(roomDoc => {
        return resolve(null)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

async function deleteOne (roomName) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await RoomsListModel.deleteOne({ room_name: roomName })
  
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
