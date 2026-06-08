import {Router} from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { createLiability, getAllLiabilities, getLiabilityAllocation } from "../controllers/liabilityController";

/**
 * @swagger
 * tags:
 *   - name: Liability
 *     description: Liability management endpoints
 * /liability/all:
 *   get:
 *     summary: Retrieve all liabilities
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of liabilities
 * /liability/create:
 *   post:
 *     summary: Create a new liability
 *     tags: [Liability]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liability'
 *     responses:
 *       201:
 *         description: Liability created
 * /liability/allocation:
 *   get:
 *     summary: Get liability allocation
 *     tags: [Liability]
 *     responses:
 *       200:
 *         description: Allocation data
 */
const router = Router();

router.get("/all", authMiddleware,getAllLiabilities);
router.post("/create", authMiddleware, createLiability);
router.get("/allocation", authMiddleware,getLiabilityAllocation);

export default router


