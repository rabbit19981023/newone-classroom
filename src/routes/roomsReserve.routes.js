import { Router } from 'express'
import roomsReserveController from '../controllers/roomsReserve.controller.js'

const router = Router()

/** '/rooms/reserve/' Routes **/
router.get('/', roomsReserveController.index)
router.post('/add', roomsReserveController.reserve)

export default router
