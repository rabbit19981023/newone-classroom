import { Router } from 'express'
import roomsTimeController from '../controllers/roomsTime.controller.js'

const router = Router()

/** '/admin/rooms/time/' Routes **/
router.get('/add', roomsTimeController.timeTable)
router.get('/add/:room_name', roomsTimeController.timeTable)
router.post('/add/:room_name', roomsTimeController.addTime)

router.get('/delete/', roomsTimeController.timeTable)
router.get('/delete/:room_name', roomsTimeController.timeTable)
router.post('/delete/:room_name', roomsTimeController.deleteTime)

export default router
