import { Router } from "express";
import { getAllWorkersPerCategory, mainSearch } from "../controllers/categories.controller.js";

const router = Router();

// router.get("/categories/:name", getAllWorkersPerCategory);
router.get("/categories/:search", mainSearch);


export default router;
