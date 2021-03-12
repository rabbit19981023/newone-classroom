import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/room', adminController.newRoom.index)
router.post('/room', adminController.newRoom.add)
router.post('/room/delete', adminController.newRoom.delete) // DELETE the room

export default router
