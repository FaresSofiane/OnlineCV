const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authMiddleware = require('../middleware/authMiddleware');
const apiRouter = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(`Database connection error: ${error.message}`));

// Routes
app.use('/api', apiRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


export default app;