import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.info("Logged out successfully");
		navigate("/login");
	};

	return (
		<nav className="sticky top-0 z-50 bg-brand-bg border-b border-brand-text/15 px-6 py-4 flex justify-between items-center backdrop-blur">
			<h1 className="text-xl font-bold tracking-wide text-brand-text">LEAD</h1>

			<div className="flex items-center gap-6">
				<Link
					to="/"
					className="text-brand-text/85 hover:text-brand-text font-medium transition"
				>
					Dashboard
				</Link>

				<Link
					to="/leads"
					className="text-brand-text/85 hover:text-brand-text font-medium transition"
				>
					Leads
				</Link>

				<button
					onClick={handleLogout}
					className="bg-brand-text text-brand-bg px-3 py-1 rounded-md hover:opacity-90 transition"
				>
					Logout
				</button>
			</div>
		</nav>
	);
}
