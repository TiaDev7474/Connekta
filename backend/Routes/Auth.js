const router = require('express').Router()
const authController = require('../Controller/Auth')

router.post('/login',authController.loginUser)
router.post('/register',authController.register)

module.exports = router