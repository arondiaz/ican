import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { metrics } from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", login);
router.get("/metrics", verifyToken, metrics);

export default router;
