// Import Date Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

export default {
  index: async function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'User')
    data.user = parsingUser(req.user)

    const filter = {
      user: data.user,
      status: '審核中'
    }

    if (req.query.status) {
      filter.status = req.query.status
    }

    if (req.query.date) {
      filter.date = req.query.date
    }

    try {
      const roomsReserve = await RoomsReserveModel.findMany(filter)

      data.data = JSON.parse(JSON.stringify(roomsReserve))

      return res.render('auditStatus', { layout: 'user', data: data })
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }
  }
}
