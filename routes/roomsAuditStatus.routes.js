import { Router } from 'express'
import roomsAuditController from '../controllers/roomsAuditStatus.controller.js'

const router = Router()

router.get('/', roomsAuditController.index)

export default router
