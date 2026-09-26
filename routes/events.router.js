import { Router } from 'express';
import eventTicketsRouter from './event-tickets.router.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ events: [] });
});

router.use('/:eid/tickets', eventTicketsRouter);

export default router;