import { Router } from "express";
import { getDashboardOverview } from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/authMiddleware";

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Dashboard overview endpoints
 * /dashboard/cards:
 *   get:
 *     summary: Get dashboard cards overview
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
const router = Router();

router.get("/cards", authMiddleware, getDashboardOverview);

export default router;

