/** Importing Date Models **/
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
  }
}
