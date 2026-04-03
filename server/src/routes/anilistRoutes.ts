import { Router } from 'express';
import { search } from '../controllers/anilistController';

const router = Router();

router.get('/search', search);

export default router;
