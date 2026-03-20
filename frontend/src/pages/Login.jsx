import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await api.post("/auth/login", form);

			// store token
			localStorage.setItem("token", res.data.token);

			// redirect to dashboard
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-80"
			>
				<h2 className="text-xl font-bold mb-4 text-center">Login</h2>

				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					className="w-full mb-3 p-2 border rounded"
					required
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					className="w-full mb-3 p-2 border rounded"
					required
				/>

				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
				>
					{loading ? "Logging in..." : "Login"}
				</button>

				<p className="text-sm mt-3 text-center">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-600">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}
