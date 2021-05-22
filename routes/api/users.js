const express = require('express')
const router = express.Router()
const userControllers = require('../../controllers/users')

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.post('/logout', userControllers.logout)


module.exports = router