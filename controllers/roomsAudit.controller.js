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

    RoomsReserveModel.findMany(filter, (error, roomsReserve) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      data.data = JSON.parse(JSON.stringify(roomsReserve))

      return res.render('reserveAudit', { layout: 'admin', data: data })
    })
  },

  audit: function (req, res) {
    const reserveId = req.body.reserve_id
    const isAuditSuccess = parseInt(req.body.is_audit_success)
    const result = req.body.result

    const auditResult = {
      status: '審核未通過',
      result: result
    }

    if (isAuditSuccess) {
      auditResult.status = '已被借用'
    }

    RoomsReserveModel.updateOne({ _id: reserveId }, auditResult, async (error) => {
      if (error) { return res.render('500error', { layout: 'error' }) }

      if (auditResult.status === '已被借用') {
        await RoomsReserveModel.findOne({ _id: reserveId }, async (error, reserveAudited) => {
          if (error) { return res.render('500error', { layout: 'error' }) }

          await RoomsReserveModel.findMany({
            room_name: reserveAudited.room_name,
            date: reserveAudited.date,
            status: '審核中'
          }, async (error, roomsReserve) => {
            if (error) { return res.render('500error', { layout: 'error' }) }

            await roomsReserve.forEach(async eachRoomReserve => {
              const times = eachRoomReserve.times
              const originTimes = times.slice()

              for (let i = (times.length - 1); i >= 0; i--) {
                if (reserveAudited.times.includes(times[i])) {
                  times.splice(i, 1)
                }
              }

              const content = {
                times: times
              }

              if (times.length === 0) {
                content.times = originTimes
                content.status = '審核未通過'
                content.result = '已被其他使用者借用'
              }

              await RoomsReserveModel.updateOne({ _id: eachRoomReserve._id }, content, (error) => {
                if (error) { return res.render('500error', { layout: 'error' }) }
              })
            })
          })
        })
      }

      return res.redirect('/admin/rooms/audit?message=審核成功！')
    })
  }
}
