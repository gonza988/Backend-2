import {Router} from 'express';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', authMiddleware, (req, res) => {