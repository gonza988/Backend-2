
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routes/sessions.router.js';
import eventsRouter from './routes/events.router.js';
import { configurePassport } from './config/passport.config.js';
import {connectDB} from './config/database.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor activo' });
});

// Routes
app.use('/api/sessions', sessionsRouter);
app.use('/api/events', eventsRouter);


export default app;
