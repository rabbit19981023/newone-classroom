import { Router } from 'express'
import homeController from '../controllers/home.controller.js'

const router = Router()

/** /home/ Routes **/
router.get('/index', homeController.index)

// exports the express.Router instance
export default router
