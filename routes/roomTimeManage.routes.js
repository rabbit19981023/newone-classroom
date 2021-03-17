import { Router } from 'express'
import roomTimeManageController from '../controllers/roomTimeManage.controller.js'

const router = Router()

router.get('/index', roomTimeManageController.index)

export default router
