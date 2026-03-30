import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoute from "./routes/userRoute.js"
import activityRoutes from "./routes/activityRoutes.js"

const app = express();

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoute)
app.use("/api/activities", activityRoutes)

export default app;