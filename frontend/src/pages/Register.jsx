import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await api.post("/auth/register", form);

			// ✅ store token
			localStorage.setItem("token", res.data.token);

			// ✅ redirect to dashboard (/)
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
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
				<h2 className="text-xl font-bold mb-4 text-center">Register</h2>

				<input
					type="text"
					name="name"
					placeholder="Name"
					value={form.name}
					onChange={handleChange}
					className="w-full mb-3 p-2 border rounded"
					required
				/>

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
					className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
				>
					{loading ? "Registering..." : "Register"}
				</button>

				<p className="text-sm mt-3 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
