import { Router } from 'express';

import authRoutes from './admin/adminAuth.routes';
import userRoutes from './admin/adminUser.routes';
import dashboardRoutes from './admin/adminDashboard.routes';
import profileRoutes from './admin/adminProfile.routes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(dashboardRoutes);
router.use(profileRoutes);

export default router;
