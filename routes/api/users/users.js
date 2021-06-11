const express = require('express')
const router = express.Router()
const userControllers = require('../../../controllers/users')
const { validateUserReg, validateUserLogin, validateUpdateUser } = require('./validation')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.get('/verify/:verificationToken', userControllers.verify)
router.post('/register', validateUserReg, userControllers.register)
router.post('/login', validateUserLogin, userControllers.login)
router.post('/logout', guard, userControllers.logout)
router.get('/current', guard, userControllers.current)
router.patch('/', guard, validateUpdateUser, userControllers.updateSuscription)
router.patch('/avatars',[guard, upload.single('avatar')], userControllers.avatars)


module.exports = router