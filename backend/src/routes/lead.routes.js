import express from "express";
import {
	createLead,
	getLeads,
	updateLead,
	deleteLead,
	updateStatus,
} from "../controllers/lead.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

const leadRoutes = express.Router();

leadRoutes.use(protect);

leadRoutes.post("/", createLead);
leadRoutes.get("/", getLeads);
leadRoutes.put("/:id", validateObjectId(), updateLead);
leadRoutes.delete("/:id", validateObjectId(), deleteLead);
leadRoutes.patch("/:id/status", validateObjectId(), updateStatus);

export default leadRoutes;
