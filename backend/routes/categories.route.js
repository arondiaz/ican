import { Router } from "express";
import { getAllWorkersPerCategory } from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories/:name", getAllWorkersPerCategory);

export default router;
