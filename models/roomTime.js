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

function addNewTime (room, callback) {

}

export default {

}
