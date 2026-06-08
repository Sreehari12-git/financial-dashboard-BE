import {Router} from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { createAsset, getAsset, getAssetAllocation, getAssetSummary } from "../controllers/assetsController";

/**
 * @swagger
 * tags:
 *   - name: Assets
 *     description: Asset management endpoints
 * /assets/create:
 *   post:
 *     summary: Create a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       201:
 *         description: Asset created
 * /assets/all:
 *   get:
 *     summary: Retrieve all assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: List of assets
 * /assets/summary:
 *   get:
 *     summary: Get asset summary
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Summary data
 * /assets/allocation:
 *   get:
 *     summary: Get asset allocation
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Allocation data
 */
const router = Router();

router.post("/create", authMiddleware, createAsset);
router.get("/all", authMiddleware, getAsset);
router.get("/summary", authMiddleware, getAssetSummary);
router.get("/allocation", authMiddleware,getAssetAllocation);

export default router

