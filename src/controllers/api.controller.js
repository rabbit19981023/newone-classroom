/** Import Data Models **/
import RoomsReserveModel from '../models/roomsReserve.js'

export default {
  // POST '/api/reserves'
  fetchReserves: async function (req, res) {
    let filter

    // 取得特定教室的'借用狀況'
    if (req.body.room_name) {
      filter = {
        room_name: req.body.room_name,
        date: req.body.date,
        status: '已被借用',
        times: req.body.time
      }
    }

    // 取得特定教室的'審核狀況'
    if (req.body.id) {
      filter = {
        _id: req.body.id
      }
    }

    try {
      const roomReserve = await RoomsReserveModel.findOne(filter)

      return res.send(roomReserve)
    } catch (error) {
      return res.send({ status: 'Failed: Something Failed with Server !' })
    }
  }
}
