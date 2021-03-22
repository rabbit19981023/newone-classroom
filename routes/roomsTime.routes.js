import { Router } from 'express'
import roomsTimeController from '../controllers/roomsTime.controller.js'

const router = Router()

/** /admin/rooms/time/ Routes **/
router.get('/', roomsTimeController.index)
router.post('/add', roomsTimeController.addTime)
router.get('/delete/', roomsTimeController.deleteIndex)
router.get('/delete/:room_name', roomsTimeController.deleteIndex)
router.post('/delete/:room_name', roomsTimeController.deleteTime)

export default router
