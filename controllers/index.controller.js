/** Importing Date Models **/
import RoomsReserveModel from '../models/roomsReserve.js'

import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: function (req, res) {
    const data = {}
    data.user = parsingUser(req.user)

    const filter = {
      status: '已被借用'
    }

    if (req.query.room_name) {
      filter.room_name = req.query.room_name
    }

    if (req.query.date) {
      const dateInput = req.query.date.split('-')
      const weekDay = new Date(dateInput).getDay()
      const date = parseInt(dateInput[2])
      
      const dateArr = []

      for (let i = 0; i < 7; i++) {
        const dateAdd = dateInput[0] + '-' + dateInput[1] + '-' + (date - (weekDay - i))

        dateArr.push(dateAdd)
      }

      console.log(dateArr)
    }

    RoomsReserveModel.findMany(filter, (error, roomsReserve) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      data.data = roomsReserve

      return res.render('index', { layout: 'user', data: data })
    })
  }
}
