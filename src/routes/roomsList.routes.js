import { Router } from 'express'
import roomsListController from '../controllers/roomsList.controller.js'

const router = Router()

/** '/admin/rooms/list/' Routes **/
router.get('/', roomsListController.index)
router.post('/add', roomsListController.addRoom)
router.post('/delete', roomsListController.deleteRoom) // DELETE the room

export default router
