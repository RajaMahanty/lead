import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// REGISTER
export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json({ msg: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			token: generateToken(user._id),
		});
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

// LOGIN
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		res.json({
			token: generateToken(user._id),
		});
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};
