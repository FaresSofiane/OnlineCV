const express = require('express')
const authRouter = require('./auth');
const cvRouter = require('./cv');
const userRouter = require('./user');

const app = express();

app.use('/auth', authRouter)
app.use('/cv', cvRouter)
app.use('/user', userRouter)

module.exports = app;
