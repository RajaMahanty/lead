import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function Register() {
	return <h1>Register Page</h1>;
}

function Dashboard() {
	return <h1>Dashboard</h1>;
}

function Leads() {
	return <h1>Leads Page</h1>;
}

function ProtectedRoute({ children }) {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default function App() {
	return (
		<Routes>
			{/* Public */}
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			{/* Protected */}
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/leads"
				element={
					<ProtectedRoute>
						<Leads />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
