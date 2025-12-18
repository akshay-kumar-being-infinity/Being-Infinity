import express from 'express';
import type { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
import cors from 'cors';

app.use(cors({
  origin: [
    "http://localhost:5173",     // Vite dev
    "http://localhost:3000",     // Backend itself
    "https://being-infinity-codify.onrender.com" //deployed API'S
  ],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/user', userRoutes)
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
