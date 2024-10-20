const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

app.use(cors())

// Middleware JSON
app.use(express.json());

// Connexion à la base de données
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(`Database connection error: ${error.message}`));

// Routes
const apiRouter = require("./routes");

app.use('/api/', apiRouter);

// Démarrage du serveur
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});