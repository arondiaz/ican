import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { metrics } from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", login, verifyToken);
router.get("/metrics", metrics, verifyToken);

export default router;
