import { Router } from 'express';
import eventsRouter from './events.js';
import sessionsRouter from './sessions.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API de semana 4 passport y current',
    endpoints: {
      register: 'POST /api/sessions/register',
      login: 'POST /api/sessions/login',
      current: 'GET /api/sessions/current',
      logout: 'GET /api/sessions/logout'
    }
  });
}); // ← Faltaba cerrar aquí

router.use('/sessions', sessionsRouter);
router.use('/events', eventsRouter); // si quieres usar events también

export default router;