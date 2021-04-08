// Import Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'Admin')
    data.user = parsingUser(req)

    let filter = { status: '審核中' }

    if (req.query.status) {
      filter = { status: req.query.status }
    }

    RoomsReserveModel.findMany(filter, async (error, roomsReserve) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      data.data = JSON.parse(JSON.stringify(roomsReserve))

      return res.render('reserveAudit', { layout: 'admin', data: data })
    })
  },

  audit: function (req, res) {
    console.log(req.body)
  }
}
