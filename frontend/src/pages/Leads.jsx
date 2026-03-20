import { useEffect, useState } from "react";
import api from "../api/axios";
import LeadModal from "../componenets/LeadModal";

export default function Leads() {
	const [leads, setLeads] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [selectedLead, setSelectedLead] = useState(null);
	const [isCreateMode, setIsCreateMode] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		status: "new",
	});
	const [file, setFile] = useState(null);
	const [emailForm, setEmailForm] = useState({
		subject: "",
		message: "",
	});
	const [emailNotice, setEmailNotice] = useState("");

	const fetchLeads = async () => {
		try {
			setLoading(true);
			const res = await api.get("/leads");
			setLeads(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLeads();
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const openLeadModal = (lead) => {
		setIsCreateMode(false);
		setSelectedLead(lead);
		setForm({
			name: lead.name,
			email: lead.email,
			phone: lead.phone,
			status: lead.status,
		});
		setFile(null);
		setEmailForm({
			subject: "",
			message: "",
		});
		setEmailNotice("");
		setShowModal(true);
	};

	const openAddLeadModal = () => {
		setIsCreateMode(true);
		setSelectedLead(null);
		setForm({
			name: "",
			email: "",
			phone: "",
			status: "new",
		});
		setFile(null);
		setEmailForm({
			subject: "",
			message: "",
		});
		setEmailNotice("");
		setShowModal(true);
	};

	const closeLeadModal = () => {
		setShowModal(false);
		setIsCreateMode(false);
		setSelectedLead(null);
		setForm({ name: "", email: "", phone: "", status: "new" });
		setFile(null);
		setEmailForm({ subject: "", message: "" });
		setEmailNotice("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			Object.keys(form).forEach((key) => {
				formData.append(key, form[key]);
			});

			if (file) {
				formData.append("image", file);
			}

			if (isCreateMode) {
				await api.post("/leads", formData);
			} else if (selectedLead?._id) {
				await api.put(`/leads/${selectedLead._id}`, formData);
			}

			setShowModal(false);
			setIsCreateMode(false);
			setSelectedLead(null);
			setFile(null);
			setEmailNotice("");
			setEmailForm({ subject: "", message: "" });
			setForm({ name: "", email: "", phone: "", status: "new" });

			fetchLeads();
		} catch (err) {
			console.error(err);
			alert(isCreateMode ? "Failed to create lead" : "Failed to update lead");
		}
	};

	const handleEmailChange = (e) => {
		setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
	};

	const handleSendEmail = async (e) => {
		e.preventDefault();

		if (!selectedLead?._id) {
			setEmailNotice("No lead selected.");
			return;
		}

		if (!emailForm.subject.trim() || !emailForm.message.trim()) {
			setEmailNotice("Please enter subject and message before sending.");
			return;
		}

		try {
			const res = await api.post(`/leads/${selectedLead._id}/send-email`, {
				subject: emailForm.subject,
				message: emailForm.message,
			});

			setEmailNotice(
				`Email sent to ${form.email}. Status updated to contacted.`,
			);
			setEmailForm({ subject: "", message: "" });
			setForm((prev) => ({ ...prev, status: "contacted" }));

			if (res.data?.data?._id) {
				setLeads((prev) =>
					prev.map((lead) =>
						lead._id === res.data.data._id ? res.data.data : lead,
					),
				);
			}
		} catch (err) {
			setEmailNotice(err.response?.data?.msg || "Failed to send email.");
		}
	};

	const handleDeleteLead = async () => {
		if (!selectedLead?._id) return;

		const confirmed = window.confirm(
			`Are you sure you want to delete ${selectedLead.name}?`,
		);

		if (!confirmed) return;

		try {
			await api.delete(`/leads/${selectedLead._id}`);
			setLeads((prev) => prev.filter((lead) => lead._id !== selectedLead._id));
			closeLeadModal();
		} catch (err) {
			console.error(err);
			alert("Failed to delete lead");
		}
	};

	if (loading) return <p className="p-6 text-gray-600">Loading leads...</p>;

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-6 flex items-center justify-between gap-3">
					<h1 className="text-3xl font-bold text-gray-800">Leads Dashboard</h1>
					<button
						type="button"
						onClick={openAddLeadModal}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
					>
						+ Add Lead
					</button>
				</div>
				<p className="text-sm text-gray-500 mt-1 mb-4">
					Click a lead row to manage details, status, and compose email.
				</p>

				<div className="bg-white shadow-lg rounded-xl overflow-hidden">
					<table className="w-full">
						<thead className="bg-gray-50 border-b">
							<tr className="text-left text-gray-600 text-sm">
								<th className="p-4">Lead</th>
								<th className="p-4">Contact</th>
								<th className="p-4">Phone</th>
								<th className="p-4">Status</th>
							</tr>
						</thead>

						<tbody>
							{leads.map((lead) => (
								<tr
									key={lead._id}
									onClick={() => openLeadModal(lead)}
									className="border-b hover:bg-gray-50 transition cursor-pointer"
								>
									<td className="p-4 flex items-center gap-3">
										{lead.image ? (
											<img
												src={`http://localhost:5000/${lead.image}`}
												alt={lead.name}
												className="w-10 h-10 rounded-full object-cover"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
												{lead.name[0]}
											</div>
										)}

										<div>
											<p className="font-medium text-gray-800">{lead.name}</p>
											<p className="text-xs text-gray-500">{lead.email}</p>
										</div>
									</td>

									<td className="p-4 text-gray-600">{lead.email}</td>
									<td className="p-4 text-gray-600">{lead.phone}</td>

									<td className="p-4">
										<span className="px-3 py-1 text-xs rounded-full font-semibold border capitalize">
											{lead.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{leads.length === 0 && (
						<p className="p-6 text-center text-gray-500">No leads found</p>
					)}
				</div>
			</div>

			<LeadModal
				isOpen={showModal}
				isCreateMode={isCreateMode}
				selectedLead={selectedLead}
				form={form}
				onFormChange={handleChange}
				onFileChange={handleFileChange}
				onClose={closeLeadModal}
				onSubmit={handleSubmit}
				emailForm={emailForm}
				onEmailChange={handleEmailChange}
				onSendEmail={handleSendEmail}
				emailNotice={emailNotice}
				onDelete={handleDeleteLead}
			/>
		</div>
	);
}
