import { Router } from 'express';
import eventsRoutes from './events.routes.js';
import sessionsRoutes from './sessions.routes.js';
 
const router = Router();
 
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor activo' });
});
 
router.use('/events', eventsRoutes);
router.use('/sessions', sessionsRoutes);
 
export default router;
 