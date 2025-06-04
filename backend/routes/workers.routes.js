import { Router } from "express";
import { getWorkers, createWorker, updateWorker, deleteWorker, getWorker } from "../controllers/workers.controller.js";

const router = Router();

router.get("/workers", getWorkers);
router.post("/workers", createWorker);
router.put("/workers/:id", updateWorker);
router.delete("/workers/:id", deleteWorker);
router.get("/workers/:id", getWorker);

export default router;
