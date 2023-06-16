const { authMiddleware } = require("../Middleware/Auth")
const  RequestController = require('../Controller/Request')
const router = require('express').Router();

router.post('/send',authMiddleware, RequestController.sendRequest);
router.post('/:requestId/accept', authMiddleware, RequestController.accept);
router.post('/:requestId/reject',authMiddleware,RequestController.reject);
router.get('/all',authMiddleware, RequestController.getAll);

module.exports = router