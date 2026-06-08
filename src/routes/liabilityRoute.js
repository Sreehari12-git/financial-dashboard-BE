import {Router} from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { createLiability, getAllLiabilities, getLiabilityAllocation } from "../controllers/liabilityController";

const router = Router();

router.get("/all", authMiddleware,getAllLiabilities);
router.post("/create", authMiddleware, createLiability);
router.get("/allocation", authMiddleware,getLiabilityAllocation);

export default router


