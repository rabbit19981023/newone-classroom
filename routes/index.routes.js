import { Router } from 'express'
import indexController from '../controllers/index.controller.js'

const router = Router()

/** /index/ Routes **/
router.get('/', indexController.index)
router.get('/rooms/reserve', indexController.roomsReserve)
router.get('/rooms/reserve/:room_name/', indexController.roomsReserve)
router.get('/rooms/reserve/:room_name/:date', indexController.roomsReserve)

// exports the express.Router instance
export default router
