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
	emailNotice,
	onDelete,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center">
			<div className="bg-white p-6 rounded-xl w-full max-w-2xl space-y-6 shadow-lg">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="text-xl font-bold text-gray-800">
							{isCreateMode ? "Add Lead" : "Manage Lead"}
						</h2>
						{!isCreateMode && selectedLead && (
							<p className="text-sm text-gray-500">
								{selectedLead.name} • {selectedLead.email}
							</p>
						)}
					</div>

					<button
						type="button"
						onClick={onClose}
						className="px-3 py-1 border rounded"
					>
						Close
					</button>
				</div>

				{!isCreateMode && selectedLead && (
					<div className="flex justify-center">
						{selectedLead.image ? (
							<img
								src={`http://localhost:5000/${selectedLead.image}`}
								alt={selectedLead.name}
								className="w-20 h-20 rounded-full object-cover border"
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-medium text-gray-700 border">
								{selectedLead.name?.[0] || "L"}
							</div>
						)}
					</div>
				)}

				<form onSubmit={onSubmit} className="space-y-3 border-b pb-5">
					<h3 className="font-semibold text-gray-700">
						{isCreateMode ? "Lead Info" : "Update Lead Info"}
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<input
							name="name"
							placeholder="Name"
							value={form.name}
							onChange={onFormChange}
							className="w-full border p-2 rounded"
							required
						/>

						<input
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={onFormChange}
							className="w-full border p-2 rounded"
							required
						/>

						<input
							name="phone"
							placeholder="Phone"
							value={form.phone}
							onChange={onFormChange}
							className="w-full border p-2 rounded"
							required
						/>

						<select
							name="status"
							value={form.status}
							onChange={onFormChange}
							className="w-full border p-2 rounded"
						>
							<option value="new">New</option>
							<option value="contacted">Contacted</option>
							<option value="converted">Converted</option>
						</select>
					</div>

					<input
						className="w-full border p-2 rounded"
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
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							{isCreateMode ? "Create Lead" : "Update Lead"}
						</button>
					</div>
				</form>

				{!isCreateMode && (
					<form onSubmit={onSendEmail} className="space-y-3">
						<h3 className="font-semibold text-gray-700">Compose Email</h3>

						<input
							name="subject"
							value={emailForm.subject}
							onChange={onEmailChange}
							placeholder="Email subject"
							className="w-full border p-2 rounded"
						/>

						<textarea
							name="message"
							value={emailForm.message}
							onChange={onEmailChange}
							placeholder="Write your message to this lead..."
							className="w-full border p-2 rounded min-h-32"
						/>

						<div className="flex items-center justify-between gap-2">
							<p className="text-xs text-gray-500">
								Recipient: <span className="font-medium">{form.email}</span>
							</p>

							<button
								type="submit"
								className="bg-emerald-600 text-white px-4 py-2 rounded"
							>
								Send Email
							</button>
						</div>

						{emailNotice && (
							<p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2">
								{emailNotice}
							</p>
						)}
					</form>
				)}
			</div>
		</div>
	);
}
