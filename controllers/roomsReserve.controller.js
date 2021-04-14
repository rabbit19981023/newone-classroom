// import the Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'
import renderTimeTable from '../utils/renderTimeTable.js'

/** Routes Controllers **/
export default {
  // GET '/rooms/reserve'
  index: function (req, res) {
    const data = {}
    data.user = parsingUser(req.user)
    data.isAuth = isAuth(req.user, 'User')

    renderTimeTable(req, res, data, 'reserve')
  },

  // POST '/rooms/reserve/add'
  reserve: async function (req, res) {
    const data = req.body

    try {
      await RoomsReserveModel.add(data)

      return res.redirect('./?message="借用成功！請等待管理員審核"')
    } catch (error) {
      return res.render('500error', { layout: 'user', data: data })
    }
  }
}
