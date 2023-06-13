const privateConversation = require('../Controller/Message.private')
const { authMiddleware } = require('../Middleware/Auth')

const router = require('express').Router()

router.get('/',authMiddleware, privateConversation.ListAll)

module.exports = router