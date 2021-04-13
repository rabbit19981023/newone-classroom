/** Importing Date Models **/
import RoomsReserveModel from '../models/roomsReserve.js'
import RoomsListModel from '../models/roomsList.js'

import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  index: async function (req, res) {
    const data = {}
    data.user = parsingUser(req.user)

    const filter = {
      status: '已被借用'
    }

    if (req.query.room_name) {
      filter.room_name = req.query.room_name
    }

    let sunday, monday, tuesday, wednesday, thursday, friday, saturday
    const weekDays = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]

    if (req.query.date) {
      const date = new Date(req.query.date)
      const weekDay = date.getDay()

      function createDates (date) {
        for (let i = 0; i < weekDays.length; i++) {
          weekDays[i] = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() - (weekDay - i)
          ))

          const str = weekDays[i].toJSON()
          weekDays[i] = str.split('T')[0]
        }
      }

      createDates(date)
    }

    try {
      const rooms = await RoomsListModel.findAll()

      data.rooms = JSON.parse(JSON.stringify(rooms))

      if (req.query.date) {
        data.reserves = {}

        for (let i = 0; i < weekDays.length; i++) {
          filter.date = weekDays[i]

          try {
            const roomsReserve = await RoomsReserveModel.findMany(filter)
            data.reserves[i] = JSON.parse(JSON.stringify(roomsReserve))
          } catch (error) {
            return res.render('500error', { layout: 'error' })
          }
        }
      }

      return res.render('index', { layout: 'user', data: data })
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }
  }
}
