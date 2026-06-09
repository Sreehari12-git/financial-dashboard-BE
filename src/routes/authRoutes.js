import {Router} from "express"
import { getMe, loginUser, registerUser } from "../controllers/authController.js"
import { logoutUser } from "../controllers/logoutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
const router = Router();

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", logoutUser)
router.get("/me", authMiddleware, getMe)
router.post("/logout", authMiddleware, logoutUser)

export default router

