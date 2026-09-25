import { Router } from 'express';
import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from '../controllers/tickets.controller.js';
import { auth as authMiddleware } from '../middlewares/auth.middleware.js';
import { autorizeRoles } from '../middlewares/roles.middleware.js';

const router = Router();

router.post('/', authMiddleware, createTicket);
router.get('/', authMiddleware, autorizeRoles('admin'), getTickets);
router.get('/:tid', authMiddleware, getTicketById);
router.put('/:tid', authMiddleware, autorizeRoles('admin'), updateTicket);
router.delete('/:tid', authMiddleware, autorizeRoles('admin'), deleteTicket);

export default router;