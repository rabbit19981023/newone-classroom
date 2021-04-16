import { Router } from 'express'
import indexController from '../controllers/index.controller.js'

const router = Router()

/** '/' Routes **/
router.get('/', indexController.index)

router.post('/', indexController.fetchReserve)

// exports the express.Router instance
export default router
