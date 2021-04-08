// import the Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'
import renderTimeTable from '../utils/renderTimeTable.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.user = parsingUser(req)
    data.isAuth = isAuth(req.user, 'User')

    renderTimeTable(req, res, data, 'reserve')
  },

  reserve: function (req, res) {
    const data = req.body

    RoomsReserveModel.add(data, (error, rooms) => {
      if (error) { return res.render('500error', { layout: 'user', data: data }) }

      res.redirect('./?message="借用成功！請等待管理員審核"')
    })
  }
}
