import express from "express";
import { upload } from "../config/multer.js";

import {
	createLead,
	deleteLead,
	getLeads,
	updateLead,
	updateStatus,
} from "../controllers/lead.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

import {
	createLeadSchema,
	updateLeadSchema,
	updateStatusSchema,
} from "../validations/lead.validation.js";

const leadRoutes = express.Router();

leadRoutes.use(protect);

leadRoutes.post(
	"/",
	upload.single("image"),
	validate(createLeadSchema),
	createLead,
);
leadRoutes.get("/", getLeads);
leadRoutes.put(
	"/:id",
	validateObjectId(),
	validate(updateLeadSchema),
	updateLead,
);
leadRoutes.delete("/:id", validateObjectId(), deleteLead);
leadRoutes.patch(
	"/:id/status",
	validateObjectId(),
	validate(updateStatusSchema),
	updateStatus,
);

export default leadRoutes;
