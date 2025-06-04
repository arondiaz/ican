import { Router } from "express";
import { getWorkers, createWorker } from "../controllers/workers.controller.js";

const router = Router();

router.get("/workers", getWorkers);
router.post("/workers", createWorker);
// router.put("/workers/:id");
// router.delete("/workers/:id");
// router.get("/workers/:id");

export default router;
