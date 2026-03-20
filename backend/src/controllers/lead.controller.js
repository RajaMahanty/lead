import Lead from "../models/Lead.js";

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
		res.status(500).json({ msg: err.message });
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
			new: true,
		});
		res.json(lead);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

// DELETE
export const deleteLead = async (req, res) => {
	try {
		const lead = await Lead.findByIdAndDelete(req.params.id);

		if (!lead) {
			return res.status(404).json({ msg: "Lead not found" });
		}

		res.json({ msg: "Lead deleted" });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};
// UPDATE STATUS
export const updateStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const lead = await Lead.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true, runValidators: true },
		);

		res.json(lead);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};
