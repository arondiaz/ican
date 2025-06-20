import { Router } from "express";
import { getWorkers, createWorker, updateWorker, deleteWorker, getWorker } from "../controllers/workers.controller.js";
import multer from "multer";

const router = Router();

// creo el almacenamiento en la memoria ram, la imagen queda guardada en memoria y disponible en el buffer de Node req.file.buffer
const storage = multer.memoryStorage();
// multer usara el almacenamiento en memoria para la imagen, upload es un middleware que procesa archivos entrantes
const upload = multer({ storage });

router.get("/workers", getWorkers);
router.post("/workers", upload.single("image"), createWorker);
router.put("/workers/:id", updateWorker);
router.delete("/workers/:id", deleteWorker);
router.get("/workers/:id", getWorker);

export default router;
