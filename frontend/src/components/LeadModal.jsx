const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const getImageUrl = (imagePath) => {
	const normalizedPath = String(imagePath || "").replace(/^\/+/, "");
	return `${BACKEND_BASE_URL}/${normalizedPath}`;
};

export default function LeadModal({
	isOpen,
	isCreateMode,
	selectedLead,
	form,
	onFormChange,
	onFileChange,
	onClose,
	onSubmit,
	emailForm,
	onEmailChange,
	onSendEmail,
	onDelete,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center">
			<div className="bg-white/95 border border-brand-text/15 p-6 rounded-xl w-full max-w-2xl space-y-6 shadow-lg">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="text-xl font-bold text-brand-text">
							{isCreateMode ? "Add Lead" : "Manage Lead"}
						</h2>
						{!isCreateMode && selectedLead && (
							<p className="text-sm text-brand-text/70">
								{selectedLead.name} • {selectedLead.email}
							</p>
						)}
					</div>

					<button
						type="button"
						onClick={onClose}
						className="px-3 py-1 border border-brand-text/30 text-brand-text rounded-md hover:bg-brand-bg transition"
					>
						Close
					</button>
				</div>

				{!isCreateMode && selectedLead && (
					<div className="flex justify-center">
						{selectedLead.image ? (
							<img
								src={getImageUrl(selectedLead.image)}
								alt={selectedLead.name}
								className="w-20 h-20 rounded-full object-cover border"
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-brand-text/15 flex items-center justify-center text-2xl font-medium text-brand-text border border-brand-text/20">
								{selectedLead.name?.[0] || "L"}
							</div>
						)}
					</div>
				)}

				<form onSubmit={onSubmit} className="space-y-3 border-b pb-5">
					<h3 className="font-semibold text-brand-text">
						{isCreateMode ? "Lead Info" : "Update Lead Info"}
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<input
							name="name"
							placeholder="Name"
							value={form.name}
							onChange={onFormChange}
							className="w-full border border-brand-text/20 p-2 rounded text-brand-text placeholder:text-brand-text/50"
							required
						/>

						<input
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={onFormChange}
							className="w-full border border-brand-text/20 p-2 rounded text-brand-text placeholder:text-brand-text/50"
							required
						/>

						<input
							name="phone"
							placeholder="Phone"
							value={form.phone}
							onChange={onFormChange}
							className="w-full border border-brand-text/20 p-2 rounded text-brand-text placeholder:text-brand-text/50"
							required
						/>

						<select
							name="status"
							value={form.status}
							onChange={onFormChange}
							className="w-full border border-brand-text/20 p-2 rounded text-brand-text"
						>
							<option value="new">New</option>
							<option value="contacted">Contacted</option>
							<option value="converted">Converted</option>
						</select>
					</div>

					<input
						className="w-full border border-brand-text/20 p-2 rounded text-brand-text"
						type="file"
						onChange={onFileChange}
					/>

					<div className="flex items-center justify-end gap-2">
						{!isCreateMode && (
							<button
								type="button"
								onClick={onDelete}
								className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
							>
								Delete Lead
							</button>
						)}

						<button
							type="submit"
							className="bg-brand-text text-brand-bg px-4 py-2 rounded hover:opacity-90 transition"
						>
							{isCreateMode ? "Create Lead" : "Update Lead"}
						</button>
					</div>
				</form>

				{!isCreateMode && (
					<form onSubmit={onSendEmail} className="space-y-3">
						<h3 className="font-semibold text-brand-text">Compose Email</h3>

						<input
							name="subject"
							value={emailForm.subject}
							onChange={onEmailChange}
							placeholder="Email subject"
							className="w-full border border-brand-text/20 p-2 rounded text-brand-text placeholder:text-brand-text/50"
						/>

						<textarea
							name="message"
							value={emailForm.message}
							onChange={onEmailChange}
							placeholder="Write your message to this lead..."
							className="w-full border border-brand-text/20 p-2 rounded min-h-32 text-brand-text placeholder:text-brand-text/50"
						/>

						<div className="flex items-center justify-between gap-2">
							<p className="text-xs text-brand-text/70">
								Recipient: <span className="font-medium">{form.email}</span>
							</p>

							<button
								type="submit"
								className="bg-brand-text text-brand-bg px-4 py-2 rounded hover:opacity-90 transition"
							>
								Send Email
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
