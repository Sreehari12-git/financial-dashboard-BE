import {Router} from "express"
import { getDashboardOverview } from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/cards", authMiddleware,getDashboardOverview)

export default router

