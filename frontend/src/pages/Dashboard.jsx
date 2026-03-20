import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const statusStyles = {
	new: "bg-blue-50 text-blue-700 border-blue-200",
	contacted: "bg-amber-50 text-amber-700 border-amber-200",
	converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
		return <p className="p-6 text-gray-600">Loading dashboard...</p>;
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-6xl mx-auto space-y-6">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
						<p className="text-sm text-gray-500 mt-1">
							Overview of your lead pipeline performance.
						</p>
					</div>

					<Link
						to="/leads"
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
					<div className="bg-white rounded-xl shadow p-5 border border-gray-100">
						<p className="text-sm text-gray-500">Total Leads</p>
						<p className="text-3xl font-bold text-gray-800 mt-2">
							{stats.total}
						</p>
					</div>

					<div className="bg-white rounded-xl shadow p-5 border border-gray-100">
						<p className="text-sm text-gray-500">New</p>
						<p className="text-3xl font-bold text-blue-700 mt-2">
							{stats.newCount}
						</p>
					</div>

					<div className="bg-white rounded-xl shadow p-5 border border-gray-100">
						<p className="text-sm text-gray-500">Contacted</p>
						<p className="text-3xl font-bold text-amber-700 mt-2">
							{stats.contacted}
						</p>
					</div>

					<div className="bg-white rounded-xl shadow p-5 border border-gray-100">
						<p className="text-sm text-gray-500">Converted</p>
						<p className="text-3xl font-bold text-emerald-700 mt-2">
							{stats.converted}
						</p>
					</div>

					<div className="bg-white rounded-xl shadow p-5 border border-gray-100">
						<p className="text-sm text-gray-500">Conversion</p>
						<p className="text-3xl font-bold text-gray-800 mt-2">
							{stats.conversionRate}%
						</p>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
					<div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
						<h2 className="font-semibold text-gray-800">Recent Leads</h2>
						<Link
							to="/leads"
							className="text-sm text-blue-600 hover:text-blue-700"
						>
							View all
						</Link>
					</div>

					{recentLeads.length === 0 ? (
						<p className="p-6 text-center text-gray-500">No leads available.</p>
					) : (
						<div className="divide-y">
							{recentLeads.map((lead) => (
								<div
									key={lead._id}
									className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
								>
									<div>
										<p className="font-medium text-gray-800">{lead.name}</p>
										<p className="text-sm text-gray-500">{lead.email}</p>
									</div>

									<span
										className={`px-3 py-1 text-xs rounded-full font-semibold border capitalize w-fit ${
											statusStyles[lead.status] ||
											"bg-gray-50 text-gray-600 border-gray-200"
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
