const privateConversation = require('../Controller/Message.private');
const { authMiddleware } = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/',authMiddleware, privateConversation.ListAlldiscussion);
router.post('/:conversationID/send',authMiddleware, privateConversation.createOne)
router.put('/:messageID/react',authMiddleware, privateConversation.addReaction)
module.exports = router;