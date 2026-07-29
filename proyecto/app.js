cat > src/app.js << 'EOF'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routes/sessions.router.js';
import eventsRouter from './routes/events.router.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor activo' });
});

// Routes
app.use('/api/sessions', sessionsRouter);
app.use('/api/events', eventsRouter);

export default app;
EOF