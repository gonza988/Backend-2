import { Router } from 'express';
import { getEvents } from '../controllers/events.js';

const eventsRouter = Router();

eventsRouter.get('/', getEvents);

export default eventsRouter;