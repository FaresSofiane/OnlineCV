import express from 'express';
import authRouter from './auth.js';
import cvRouter from './cv.js';
import userRouter from './user.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/cv', cvRouter);
router.use('/user', userRouter);

export default router;