import { Router } from "express";
import { getWorkers, createWorker, updateWorker, deleteWorker } from "../controllers/workers.controller.js";

const router = Router();

router.get("/workers", getWorkers);
router.post("/workers", createWorker);
router.put("/workers/:id", updateWorker);
router.delete("/workers/:id", deleteWorker);
// router.get("/workers/:id");

export default router;
