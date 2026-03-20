import Lead from "../models/Lead.js";
import sendEmail from "../utils/sendEmail.js";

// CREATE
export const createLead = async (req, res) => {
	try {
		const lead = await Lead.create({
			...req.body,
			image: req.file ? req.file.path : null,
		});

		res.status(201).json({
			success: true,
			data: lead,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// GET ALL
export const getLeads = async (req, res) => {
	try {
		const leads = await Lead.find().sort({ createdAt: -1 });
		res.json(leads);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// UPDATE
export const updateLead = async (req, res) => {
	try {
		const updateData = { ...req.body };
		if (req.file) {
			updateData.image = req.file.path;
		}
		const lead = await Lead.findByIdAndUpdate(req.params.id, updateData, {
			returnDocument: "after",
		});

		if (!lead) {
			return res.status(404).json({ message: "Lead not found" });
		}

		res.json(lead);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// DELETE
export const deleteLead = async (req, res) => {
	try {
		const lead = await Lead.findByIdAndDelete(req.params.id);

		if (!lead) {
			return res.status(404).json({ message: "Lead not found" });
		}

		res.json({ message: "Lead deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
// UPDATE STATUS
export const updateStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const lead = await Lead.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ returnDocument: "after", runValidators: true },
		);

		if (!lead) {
			return res.status(404).json({ message: "Lead not found" });
		}

		res.json(lead);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// SEND EMAIL + UPDATE STATUS (new -> contacted)
export const sendLeadEmail = async (req, res) => {
	try {
		const { subject, message } = req.body;

		const lead = await Lead.findById(req.params.id);

		if (!lead) {
			return res.status(404).json({ message: "Lead not found" });
		}

		if (lead.status !== "new") {
			return res.status(400).json({
				message: "Email can only be sent when lead status is new",
			});
		}

		await sendEmail({
			to: lead.email,
			subject,
			text: message,
			html: `<p>${message.replace(/\n/g, "<br/>")}</p>`,
		});

		lead.status = "contacted";
		await lead.save();

		res.json({
			success: true,
			message: "Email sent and status updated to contacted",
			data: lead,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
