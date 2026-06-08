import {Router} from "express"
import { loginUser, registerUser } from "../controllers/authController.js"
import { logoutUser } from "../controllers/logoutController.js";

const router = Router();

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", logoutUser)

export default router

