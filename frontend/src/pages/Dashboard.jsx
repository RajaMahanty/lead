import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const statusStyles = {
	new: "bg-brand-bg text-brand-text border-brand-text/30",
	contacted: "bg-brand-bg text-brand-text border-brand-text/30",
	converted: "bg-brand-bg text-brand-text border-brand-text/30",
};

export default function Dashboard() {
	const [leads, setLeads] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchLeads = async () => {
			try {
				setLoading(true);
				setError("");
				const res = await api.get("/leads");
				setLeads(res.data || []);
			} catch {
				setError("Failed to load dashboard data.");
			} finally {
				setLoading(false);
			}
		};

		fetchLeads();
	}, []);

	const stats = useMemo(() => {
		const total = leads.length;
		const newCount = leads.filter((lead) => lead.status === "new").length;
		const contacted = leads.filter(
			(lead) => lead.status === "contacted",
		).length;
		const converted = leads.filter(
			(lead) => lead.status === "converted",
		).length;
		const conversionRate = total ? Math.round((converted / total) * 100) : 0;

		return {
			total,
			newCount,
			contacted,
			converted,
			conversionRate,
		};
	}, [leads]);

	const recentLeads = useMemo(() => leads.slice(0, 5), [leads]);

	if (loading) {
		return <p className="p-6 text-brand-text/80">Loading dashboard...</p>;
	}

	return (
		<div className="min-h-screen bg-brand-bg p-6">
			<div className="max-w-6xl mx-auto space-y-6">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h1 className="text-3xl font-bold text-brand-text">Dashboard</h1>
						<p className="text-sm text-brand-text/70 mt-1">
							Overview of your lead pipeline performance.
						</p>
					</div>

					<Link
						to="/leads"
						className="bg-brand-text text-brand-bg px-4 py-2 rounded-lg hover:opacity-90 transition"
					>
						Manage Leads
					</Link>
				</div>

				{error && (
					<div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
						{error}
					</div>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					<div className="bg-white/70 rounded-xl shadow p-5 border border-brand-text/15">
						<p className="text-sm text-brand-text/70">Total Leads</p>
						<p className="text-3xl font-bold text-brand-text mt-2">
							{stats.total}
						</p>
					</div>

					<div className="bg-white/70 rounded-xl shadow p-5 border border-brand-text/15">
						<p className="text-sm text-brand-text/70">New</p>
						<p className="text-3xl font-bold text-brand-text mt-2">
							{stats.newCount}
						</p>
					</div>

					<div className="bg-white/70 rounded-xl shadow p-5 border border-brand-text/15">
						<p className="text-sm text-brand-text/70">Contacted</p>
						<p className="text-3xl font-bold text-brand-text mt-2">
							{stats.contacted}
						</p>
					</div>

					<div className="bg-white/70 rounded-xl shadow p-5 border border-brand-text/15">
						<p className="text-sm text-brand-text/70">Converted</p>
						<p className="text-3xl font-bold text-brand-text mt-2">
							{stats.converted}
						</p>
					</div>

					<div className="bg-white/70 rounded-xl shadow p-5 border border-brand-text/15">
						<p className="text-sm text-brand-text/70">Conversion</p>
						<p className="text-3xl font-bold text-brand-text mt-2">
							{stats.conversionRate}%
						</p>
					</div>
				</div>

				<div className="bg-white/70 rounded-xl shadow border border-brand-text/15 overflow-hidden">
					<div className="px-5 py-4 border-b border-brand-text/15 bg-brand-bg/70 flex items-center justify-between">
						<h2 className="font-semibold text-brand-text">Recent Leads</h2>
						<Link
							to="/leads"
							className="text-sm text-brand-text hover:opacity-80 underline underline-offset-2"
						>
							View all
						</Link>
					</div>

					{recentLeads.length === 0 ? (
						<p className="p-6 text-center text-brand-text/70">
							No leads available.
						</p>
					) : (
						<div className="divide-y">
							{recentLeads.map((lead) => (
								<div
									key={lead._id}
									className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
								>
									<div>
										<p className="font-medium text-brand-text">{lead.name}</p>
										<p className="text-sm text-brand-text/70">{lead.email}</p>
									</div>

									<span
										className={`px-3 py-1 text-xs rounded-full font-semibold border capitalize w-fit ${
											statusStyles[lead.status] ||
											"bg-brand-bg text-brand-text border-brand-text/30"
										}`}
									>
										{lead.status}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
