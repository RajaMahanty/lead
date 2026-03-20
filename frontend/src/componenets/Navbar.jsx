import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="sticky top-0 z-50 bg-white shadow px-6 py-4 flex justify-between items-center">
			<h1 className="text-xl font-bold text-blue-600">CRM</h1>

			<div className="flex items-center gap-6">
				<Link to="/" className="text-gray-700 hover:text-blue-600">
					Dashboard
				</Link>

				<Link to="/leads" className="text-gray-700 hover:text-blue-600">
					Leads
				</Link>

				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
				>
					Logout
				</button>
			</div>
		</nav>
	);
}
