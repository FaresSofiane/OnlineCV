import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/authMiddleware.js';
import apiRouter from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://your-frontend-domain.com'], // Replace with the actual domain name
    methods: ['GET', 'POST'], // Adjust methods of your API
    // other cors options
}));

app.use(express.json());
app.use(authMiddleware); // Make sure this is correctly defined

// Connection to the database
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected'))
    .catch((error) => {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); // Optionally exit the process in case of critical failure
    });

// Routes
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;