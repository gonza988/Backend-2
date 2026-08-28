import { Router } from 'express';
import eventsRouter from './events.js';
import sessionsRouter from './sessions.js';

const router = Router();

router.get('/', (req, res) => {
    response.json({ 
        status: 'success',
        message: 'API de semana 4 passport y current',
        endpoints:{
            register: "POST /api/sessions/register",
            login: "POST /api/sessions/login",
            current: "POST /api/sessions/current",
            logout: "GET /api/sessions/logout",
        }
    });

router.use('/sessions', sessionsRouter);

export default router;