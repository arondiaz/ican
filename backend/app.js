import express from "express";
import workerRoutes from "./routes/workers.routes.js";
import categoryRoutes from "./routes/categories.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

const corsOptions = {
  origin: ["http://localhost:3000", "https://ican-tau.vercel.app", "www.serviciolibre.com.ar", "serviciolibre.com.ar"], // o '*' para permitir todos (menos seguro)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.urlencoded({ extended: true }));

//middleware
app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(workerRoutes);
app.use(categoryRoutes);
app.use(authRoutes);

export default app;
