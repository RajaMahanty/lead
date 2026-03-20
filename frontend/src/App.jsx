import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./componenets/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
	const token = localStorage.getItem("token");

	if (!token) {
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
			</Routes>
			<ToastContainer position="bottom-right" autoClose={3000} />
		</>
	);
}
