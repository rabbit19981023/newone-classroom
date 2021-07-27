import { Router } from 'express'
import authUserController from '../controllers/authUser.controller.js'

const router = Router()

/** '/' Routes **/
router.get('/login', authUserController.loginForm)
router.post('/login', authUserController.login)

router.get('/sign-up', authUserController.signUpForm)
router.post('/sign-up', authUserController.signUp)

router.get('/log-out', authUserController.logOut)

export default router
