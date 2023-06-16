const { fetchUser } = require('../Controller/User');
const { authEmailVerify } = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/', authEmailVerify,fetchUser);
module.exports = router;