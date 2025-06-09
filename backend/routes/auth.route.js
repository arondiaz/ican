import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();
router.post("/login", login, verifyToken);

export default router;
