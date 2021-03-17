import { Router } from 'express'
import roomsManageController from '../controllers/roomsManage.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/index', roomsManageController.index)
router.post('/add', roomsManageController.addNewRoom)
router.post('/delete', roomsManageController.deleteRoom) // DELETE the room

export default router
