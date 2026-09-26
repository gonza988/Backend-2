import { Router } from 'express';
import { login, logout, register, getCurrentUser } from '../controllers/sessions.js';
import { auth } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';
const router = Router();

router.post('/login', login);
// router.post('/current', auth, authorizeRoles('admin','user'), logout);
router.get('/current', auth, authorizeRoles('admin','user'),getCurrentUser);
router.post('/logout', logout);
router.post('/register', register);

export default router;