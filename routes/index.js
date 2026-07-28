import { Router } from 'express';
import eventsRouter from './events.js';
import sessionsRouter from './sessions.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/sessions', sessionsRouter);

export default router;