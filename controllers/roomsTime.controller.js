// Import Data Models
import RoomsTimeModel from '../models/roomsTime.js'

import isAuth from '../utils/isAuth.js'
import parsingUser from '../utils/parsingUser.js'
import renderTimeTable from '../utils/renderTimeTable.js'

/** Global Namespace**/
async function getUploadedData (req, callback) {
  const data = {
    room_name: req.params.room_name,
    weeks: [],
    times: []
  }

  const inputs = req.body.room_time

  try {
    // if (array inputs.length > 1):
    await inputs.forEach(input => {
      input = input.split(',')

      data.weeks.push(input[0])
      data.times.push(input[1])
    })
  } catch (error) {
    try {
      // if (array inputs.length == 1):
      const input = inputs.split(',')

      data.weeks.push(input[0])
      data.times.push(input[1])
    } catch (error) {
      // this returned data is empty because of a error occured
      return callback(data)
    }
  }

  return callback(data)
}

/** Routes Controller **/
export default {
  timeTable: function (req, res) {
    const data = {}
    data.isAuth = isAuth(req.user, 'Admin')
    data.user = parsingUser(req)

    const path = req.path.split('/')[1]

    const mode = {
      string: '',
      add: false,
      delete: false
    }

    switch (path) {
      case 'add':
        mode.add = true
        mode.string = 'add'
        break
      case 'delete':
        mode.delete = true
        mode.string = 'delete'
        break
    }

    data.mode = mode

    renderTimeTable(req, res, data, mode.string)
  },

  addTime: function (req, res) {
    getUploadedData(req, (roomTime) => {
      RoomsTimeModel.addMany({
        room_name: roomTime.room_name,
        weeks: roomTime.weeks,
        times: roomTime.times
      }, (error) => {
        if (error === '請選擇教室時段！') {
          return res.redirect('/admin/rooms/time/add?message=請選擇教室時段！')
        }

        if (error) { return res.render('500error') }

        return res.redirect('/admin/rooms/time/add?message=新增教室時段成功！')
      })
    })
  },

  deleteTime: function (req, res) {
    getUploadedData(req, (roomTime) => {
      RoomsTimeModel.deleteMany({
        room_name: roomTime.room_name,
        weeks: roomTime.weeks,
        times: roomTime.times
      }, (error) => {
        if (error === '請選擇教室時段！') {
          return res.redirect('/admin/rooms/time/add?message=請選擇教室時段！')
        }

        if (error) { return res.render('500error') }

        return res.redirect('/admin/rooms/time/delete?message=刪除教室時段成功！')
      })
    })
  }
}
