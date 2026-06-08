import { Router } from "express";
import { getFamilyTree } from "../controllers/familyTreeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()

router.get("/family-tree",authMiddleware, getFamilyTree);

export default router

