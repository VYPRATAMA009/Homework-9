import express from 'express';
import UserRoutes from './users_routes.js';
import moviesRoutes from './movies_routes.js';

const router = express.Router();

router.use('/api',UserRoutes);
router.use('/api',moviesRoutes);

export default router;