import { Router } from 'express'
import authAdminController from '../controllers/authAdmin.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/login', authAdminController.loginForm)
router.post('/login', authAdminController.login)

router.get('/log-out', authAdminController.logOut)

export default router
