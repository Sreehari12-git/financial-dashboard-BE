import { Router } from "express";
import { createFamilyMember, getFamilyMemberById, getFamilyMembers } from "../controllers/familyMemberController";
import { authMiddleware } from "../middleware/authMiddleware";

/**
 * @swagger
 * tags:
 *   - name: FamilyMember
 *     description: Family member management
 * /family-members/all:
 *   get:
 *     summary: Get all family members
 *     tags: [FamilyMember]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of family members
 * /family-members/{id}:
 *   get:
 *     summary: Get a family member by ID
 *     tags: [FamilyMember]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Family member object
 * /family-members/create:
 *   post:
 *     summary: Create a new family member
 *     tags: [FamilyMember]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FamilyMember'
 *     responses:
 *       201:
 *         description: Created successfully
 */

const router = Router()

router.get("/all", authMiddleware, getFamilyMembers);
router.get("/:id", authMiddleware, getFamilyMemberById);
router.post("/create",authMiddleware,createFamilyMember)


export default router;
