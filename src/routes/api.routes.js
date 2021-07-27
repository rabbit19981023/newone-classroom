import { Router } from 'express'
import apiController from '../controllers/api.controller.js'

const router = Router()

/** '/api/' Routes **/
router.post('/reserves', apiController.fetchReserves)

export default router
