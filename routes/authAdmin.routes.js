import { Router } from 'express'
import authAdminController from '../controllers/authAdmin.controller.js'

const router = Router()

/** /admin/ Routes **/
router.get('/login', authAdminController.loginForm)
router.post('/login', authAdminController.login)

/** Closing the Sign-up Feature Unless the Need **/
// router.get('/sign-up', authAdminController.signUpForm)
// router.post('/sign-up', authAdminController.signUp)

router.get('/log-out', authAdminController.logOut)

export default router
