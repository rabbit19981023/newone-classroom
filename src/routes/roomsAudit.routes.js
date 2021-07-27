import { Router } from 'express'
import roomsAuditController from '../controllers/roomsAudit.controller.js'

const router = Router()

/** '/admin/rooms/audit/' Routes **/
router.get('/', roomsAuditController.index)
router.post('/', roomsAuditController.audit)

export default router
