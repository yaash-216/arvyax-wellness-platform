import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import "./config/env.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api", sessionRoutes);

app.get("/", (req, res) =>
  res.send({ ok: true, message: "Arvyax Wellness API" })
);

app.use(errorHandler);

export default app;
