import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/leads", leadRoutes);

app.get("/", (req, res) => {
	res.send("API running");
});

export default app;
