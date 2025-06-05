import express from "express";
import workerRoutes from "./routes/workers.routes.js";
import categoryRoutes from "./routes/categories.route.js";
import cors from "cors";

const corsOptions = {
  origin: "*", // o '*' para permitir todos (menos seguro)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

const app = express();

//middleware
app.use(express.json());

app.use(cors(corsOptions));

app.use(workerRoutes);
app.use(categoryRoutes);

export default app;
