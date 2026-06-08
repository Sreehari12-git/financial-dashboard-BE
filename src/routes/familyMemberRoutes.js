import { Router } from "express";
import { createFamilyMember, getFamilyMemberById, getFamilyMembers } from "../controllers/familyMemberController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()

router.get("/all", authMiddleware, getFamilyMembers);
router.get("/:id", authMiddleware, getFamilyMemberById);
router.post("/create",authMiddleware,createFamilyMember)

export default router

