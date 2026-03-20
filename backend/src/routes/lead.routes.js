import express from "express";
import { upload } from "../config/multer.js";

import {
	createLead,
	deleteLead,
	getLeads,
	sendLeadEmail,
	updateLead,
	updateStatus,
} from "../controllers/lead.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

import {
	createLeadSchema,
	sendLeadEmailSchema,
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
	upload.single("image"),
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
leadRoutes.post(
	"/:id/send-email",
	validateObjectId(),
	validate(sendLeadEmailSchema),
	sendLeadEmail,
);

export default leadRoutes;
