// Import Date Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

export default {
  index: function (req, res) {
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

    RoomsReserveModel.findMany(filter, (error, roomsReserve) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      data.data = JSON.parse(JSON.stringify(roomsReserve))

      return res.render('auditStatus', { layout: 'user', data: data })
    })
  }
}
