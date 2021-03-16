import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/rooms-management', adminController.roomsManageIndex)
router.post('/rooms/add', adminController.addNewRoom)
router.post('/rooms/delete', adminController.deleteRoom) // DELETE the room

export default router
