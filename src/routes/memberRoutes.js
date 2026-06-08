import { Router } from "express";
import { getMemberDetails } from "../controllers/memberController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id",authMiddleware, getMemberDetails);

export default router

