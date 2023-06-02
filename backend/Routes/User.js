const { fetchUser } = require('../Controller/User')
const { authMiddleware } = require('../Middleware/Auth')

const router = require('express').Router()

router.get('/', authMiddleware,fetchUser )
module.exports = router