const express = require('express')
const authRouter = require('./auth');
const cvRouter = require('./cv');
const userRouter = require('./user');

const router = express.Router();

router.use('/auth', authRouter)
router.use('/cv', cvRouter)
router.use('/user', userRouter)

module.exports = router;
