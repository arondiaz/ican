import express from "express";
import workerRoutes from "./routes/workers.routes.js";

const app = express();

//middleware
app.use(express.json());

app.use(workerRoutes);

export default app;
