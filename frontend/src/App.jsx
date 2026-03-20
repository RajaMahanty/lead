import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Login from "./pages/Login";
import Register from "./pages/Register";

function isTokenValid(token) {
	try {
		const payloadBase64 = token.split(".")[1];
		if (!payloadBase64) return false;

		const payloadJson = atob(
			payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
		);
		const payload = JSON.parse(payloadJson);

		if (!payload.exp) return false;

		const currentTimeInSeconds = Math.floor(Date.now() / 1000);
		return payload.exp > currentTimeInSeconds;
	} catch {
		return false;
	}
}

function ProtectedRoute({ children }) {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" />;
	}

	if (!isTokenValid(token)) {
		localStorage.removeItem("token");
		return <Navigate to="/login" />;
	}

	return children;
}

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}

export default function App() {
	return (
		<>
			<Routes>
				{/* Public */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Protected */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Layout>
								<Dashboard />
							</Layout>
						</ProtectedRoute>
					}
				/>

				<Route
					path="/leads"
					element={
						<ProtectedRoute>
							<Layout>
								<Leads />
							</Layout>
						</ProtectedRoute>
					}
				/>

				<Route
					path="*"
					element={
						<Navigate
							to={
								isTokenValid(localStorage.getItem("token") || "")
									? "/"
									: "/login"
							}
							replace
						/>
					}
				/>
			</Routes>
			<ToastContainer position="bottom-right" autoClose={3000} />
		</>
	);
}
