// Import Data Models
import RoomsReserveModel from '../models/roomsReserve.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'

/** Routes Controllers **/
export default {
  // GET '/admin/rooms/audit'
  index: async function (req, res) {
    /** 每當開啟此審核頁面時，程式會自動審核已過期的所有預約紀錄 **/
    const today = new Date().setHours(0, 0, 0, 0) // if (00:00-07:59)? yesterday : today

    try {
      const roomsReserves = await RoomsReserveModel.findMany({ status: '審核中' })

      roomsReserves.forEach(async eachReserve => {
        const reserveDate = new Date(eachReserve.date)

        if (reserveDate < today) {
          await RoomsReserveModel.updateOne({ _id: eachReserve._id }, {
            status: '審核未通過',
            result: '此預約紀錄已經過期囉！(此為系統自動審核機制)'
          }, error => {  })
        }
      })
    } catch (error) {
      return res.render('500error', { layout: 'error' })
    }

      /** 頁面渲染 **/
      const data = {}
      data.isAuth = isAuth(req.user, 'Admin')
      data.user = parsingUser(req.user)

      const filter = { status: '審核中' }

      if (req.query.status) {
        filter.status = req.query.status
      }

      if (req.query.date) {
        filter.date = req.query.date
      }

      try {
        const roomsReserve = await RoomsReserveModel.findMany(filter)

        data.data = JSON.parse(JSON.stringify(roomsReserve))

        return res.render('reserveAudit', { layout: 'admin', data: data })
      } catch (error) {
        return res.render('500error', { layout: 'error' })
      }
  },

  // POST '/admin/rooms/audit/audit'
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
        try {
          const reserveAudited = await RoomsReserveModel.findOne({ _id: reserveId })

          try {
            const roomsReserve = await RoomsReserveModel.findMany({
              room_name: reserveAudited.room_name,
              date: reserveAudited.date,
              status: '審核中'
            })

            roomsReserve.forEach(async eachRoomReserve => {
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
          } catch (error) {
            return res.render('500error', { layout: 'error' })
          }
        } catch (error) {
          return res.render('500error', { layout: 'error' })
        }
      }

      return res.redirect('/admin/rooms/audit?message=審核成功！')
    })
  }
}
