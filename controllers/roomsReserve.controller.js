// import the Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../lib/isAuth.js'
import parsingUser from '../lib/parsingUser.js'
import todayFormat from '../lib/todayFormat.js'
import renderTimeTable from '../lib/renderTimeTable.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.user = parsingUser(req)
    data.isAuth = isAuth(req.user, 'User')

    renderTimeTable(req, res, data, 'reserve')
  },

  add: function (req, res) {
    const data = req.body

    const today = todayFormat(new Date())
    const reserveDay = new Date(data.date)

    if (reserveDay < today) { return res.redirect('./?message=請選擇正確的日期！') }

    RoomsReserveModel.addMany(data, (error, rooms) => {
      if (error) { return res.render('500error', { layout: 'user', data: data }) }

      res.redirect('./?message="借用成功！請等待管理員審核"')
    })
  }
}
