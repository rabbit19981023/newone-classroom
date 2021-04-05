import { Router } from 'express'
import indexController from '../controllers/index.controller.js'

const router = Router()

/** /index/ Routes **/
router.get('/', indexController.index)

// exports the express.Router instance
export default router
