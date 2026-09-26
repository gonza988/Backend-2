import { Router } from 'express';
import { createTicket, getEventTickets } from '../controllers/tickets.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';

// mergeParams: true para poder leer :eid, que viene del router padre (events)
const router = Router({ mergeParams: true });

router.post('/', auth, createTicket);
router.get('/', auth, authorizeRoles('organizer', 'admin'), getEventTickets);

export default router;