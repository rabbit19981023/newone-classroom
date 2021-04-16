/** Importing Date Models **/
import RoomsReserveModel from '../models/roomsReserve.js'
import RoomsListModel from '../models/roomsList.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

import renderTimeTable from '../utils/renderTimeTable.js'

/** Routes Controllers **/
export default {
  // GET '/'
  index: async function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'User')
    data.user = parsingUser(req.user)

    try {
      const rooms = await RoomsListModel.findAll()

      data.rooms = JSON.parse(JSON.stringify(rooms))
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }

    return renderTimeTable(req, res, data, 'index')
  },

  // POST '/'
  fetchReserve: async function (req, res) {
    const filter = {
      room_name: req.body.room_name,
      date: req.body.date,
      status: '已被借用',
      times: req.body.time
    }

    try {
      const roomReserve = await RoomsReserveModel.findOne(filter)
      
      return res.send(roomReserve)
    } catch (error) {
      return res.send({ status: 'Failed: Something Failed with Server !' })
    }
  }
}
