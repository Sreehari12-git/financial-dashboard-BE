import {Router} from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { createAsset, getAsset, getAssetAllocation, getAssetSummary } from "../controllers/assetsController";

const router = Router();

router.post("/create", authMiddleware, createAsset);
router.get("/all", authMiddleware, getAsset);
router.get("/summary", authMiddleware, getAssetSummary);
router.get("/allocation", authMiddleware,getAssetAllocation);

export default router

