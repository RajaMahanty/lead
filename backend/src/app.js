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

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: `Route not found: ${req.originalUrl}`,
	});
});

// Global error handler (Multer/Joi/runtime)
app.use((err, req, res, next) => {
	const statusCode =
		err.statusCode || err.status || (err.name === "MulterError" ? 400 : 500);

	const message =
		statusCode === 500
			? "Internal server error"
			: err.message || "Request failed";

	const response = {
		success: false,
		message,
	};

	if (Array.isArray(err.details) && err.details.length > 0) {
		response.errors = err.details.map((detail) => detail.message);
	}

	res.status(statusCode).json(response);
});

export default app;
