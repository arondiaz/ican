import express from "express";
import workerRoutes from "./routes/workers.routes.js";
import categoryRoutes from "./routes/categories.route.js";
import authRoutes from "./routes/auth.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:3000", // o '*' para permitir todos (menos seguro)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
   credentials: true, 
};

const app = express();

//middleware
app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(workerRoutes);
app.use(categoryRoutes);
app.use(authRoutes)

export default app;
