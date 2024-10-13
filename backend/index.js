require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '3002';


const apiRouter = require('./routes');

//Parse des requetes en JSON
app.use(express.json())

//Connection BDD avec mongoose
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
    })

// Recuperation des definitions de routes
app.use('/api/', apiRouter);

//Lance le server sur le port renseigné
app.listen(port, () => {
    console.log('server is running');
})

