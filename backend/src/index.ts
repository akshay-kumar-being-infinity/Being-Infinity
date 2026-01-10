import express from 'express';
import type { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Swagger Set Up
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Being Infinity API', version: '1.0' }
  },
  apis: ['./src/routes/*.ts'] // Scans YOUR routes!
};
const specs = swaggerJsdoc(options);

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes)

const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../frontend/dist");

// serve static files
app.use(express.static(frontendDistPath));

// react routing support
app.get("/*name", (_, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

