import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/rooms', adminController.newRoom.index)
router.post('/rooms', adminController.newRoom.add)
router.post('/rooms/delete', adminController.newRoom.delete) // DELETE the room

export default router
