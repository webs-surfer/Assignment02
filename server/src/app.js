import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/task", taskRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

// Error Middleware
app.use(errorHandler);

export default app;