import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ events: [] });
});

export default router;