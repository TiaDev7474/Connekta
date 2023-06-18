const { authMiddleware } = require("../Middleware/Auth")
const  RequestController = require('../Controller/Request')
const router = require('express').Router();

router.post('/send',authMiddleware, RequestController.sendRequest);
router.patch('/:requestId/accept', authMiddleware, RequestController.accept);
router.delete('/:requestId/reject',authMiddleware,RequestController.reject);
router.get('/all',authMiddleware, RequestController.getAll);

module.exports = router