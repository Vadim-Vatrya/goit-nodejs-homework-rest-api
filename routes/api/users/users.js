const express = require('express')
const router = express.Router()
const userControllers = require('../../../controllers/users')
const { validateUserReg, validateUserLogin } = require('./validation')
const guard = require('../../../helpers/guard')

router.post('/register', validateUserReg, userControllers.register)
router.post('/login', validateUserLogin, userControllers.login)
router.post('/logout', guard, userControllers.logout)
router.post('/current', guard, userControllers.current)


module.exports = router