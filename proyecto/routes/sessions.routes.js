import { Router } from 'express';
import { login, logout, register } from '../controllers/sessions.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {authorizeRoles} from '../middlewares/roles.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/current', authMiddleware, authorizeRoles('admin','user'), logout);
router.get('/logout', logout);
router.post('/register', register);

export default router;