import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Register() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await api.post("/auth/register", form);

			localStorage.setItem("token", res.data.token);
			toast.success("Registration successful");

			navigate("/");
		} catch (err) {
			toast.error(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white/70 border border-brand-text/15 p-7 rounded-xl shadow-md w-80 backdrop-blur"
			>
				<h2 className="text-xl font-bold mb-4 text-center text-brand-text">
					Register
				</h2>

				<input
					type="text"
					name="name"
					placeholder="Name"
					value={form.name}
					onChange={handleChange}
					className="w-full mb-3 p-2.5 border border-brand-text/20 rounded-md text-brand-text placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-text/25"
					required
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					className="w-full mb-3 p-2.5 border border-brand-text/20 rounded-md text-brand-text placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-text/25"
					required
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					className="w-full mb-3 p-2.5 border border-brand-text/20 rounded-md text-brand-text placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-text/25"
					required
				/>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-brand-text text-brand-bg p-2.5 rounded-md hover:opacity-90 transition disabled:opacity-60"
				>
					{loading ? "Registering..." : "Register"}
				</button>

				<p className="text-sm mt-3 text-center text-brand-text/80">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-brand-text font-semibold underline underline-offset-2"
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
