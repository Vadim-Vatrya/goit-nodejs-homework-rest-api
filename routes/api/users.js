const express = require('express')
const router = express.Router()
const userControllers = require('../../controllers/users')

router.post('/auth/register', userControllers.register)
router.post('/auth/login', userControllers.login)
router.post('/auth/logout', userControllers.logout)
router.post('/current', userControllers.current)


module.exports = router