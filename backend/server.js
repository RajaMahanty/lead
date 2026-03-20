import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
const PORT = process.env.PORT || 5000;

dotenv.config();
await connectDB();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
