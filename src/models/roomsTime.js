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
function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const roomsTime = await RoomsTimeModel.find().sort({ room_name: 1, week: 1 }).exec()

      return resolve(roomsTime)
    } catch (error) {
      return reject(error)
    }
  })
}

function findMany (filter) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomTime = await RoomsTimeModel.find(filter).exec()

      return resolve(roomTime)
    } catch (error) {
      return reject(error)
    }
  })
}

function addMany (data) {
  /******

    data = {
      room_name: String, // '2-1'
      weeks: Array, // [   '0',         '0',         '1',         '2',         '3',    ...]
      times: Array // ['0800-0900', '0900-1000', '0900-1000', '1000-1100', '1100-1200']
    }

  ******/

  // 以下的演算法會一次最多更新112個資料，可以改善為一次最多更新7個資料

  return new Promise(async (resolve, reject) => {
    if (data.times.length === 0) {
      return reject(new Error('請選擇時段！'))
    }

    let errorMessage

    for (let i = 0; i < data.times.length; i++) {
      try {
        const filter = { room_name: data.room_name, week: data.weeks[i] }

        const roomTime = await RoomsTimeModel.findOne(filter).exec()

        if (roomTime) {
          try {
            await roomTime.updateOne({ $addToSet: { times: data.times[i] } })
          } catch (error) {
            errorMessage = '500error'
          }

          continue
        }

        const roomTimeDoc = new RoomsTimeModel({
          room_name: data.room_name,
          week: data.weeks[i],
          times: data.times[i]
        })

        try {
          await roomTimeDoc.save()
        } catch (error) {
          errorMessage = '500error'
        }
      } catch (error) {
        errorMessage = '500error'
      }

      if (errorMessage) {
        return reject(new Error(errorMessage))
      }
    }

    return resolve('新增時段成功！')
  })
}

function deleteMany (data) {
  /******

    data = {
      room_name: String, // '2-1'
      weeks: Array, // [   '0',         '0',         '1',         '2',         '3',    ...]
      times: Array // ['0800-0900', '0900-1000', '0900-1000', '1000-1100', '1100-1200']
    }

  ******/

  // 以下的演算法會一次最多更新112個資料，可以改善為一次最多更新7個資料

  return new Promise(async (resolve, reject) => {
    if (data.times.length === 0) {
      return reject(new Error('請選擇時段！'))
    }

    let errorMessage

    for (let i = 0; i < data.times.length; i++) {
      try {
        const filter = { room_name: data.room_name, week: data.weeks[i] }

        const roomTime = await RoomsTimeModel.findOne(filter).exec()

        await roomTime.updateOne({ $pull: { times: data.times[i] } })
      } catch (error) {
        errorMessage = '500error'
      }

      if (errorMessage) {
        return reject(errorMessage)
      }
    }

    return resolve('刪除時段成功！')
  })
}

export default {
  findAll: findAll,
  findMany: findMany,
  addMany: addMany,
  deleteMany: deleteMany
}
