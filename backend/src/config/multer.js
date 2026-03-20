import multer from "multer";
import fs from "fs";

// ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

// storage config
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + "-" + file.originalname;
		cb(null, uniqueName);
	},
});

// filter
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only image files allowed"), false);
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 2 * 1024 * 1024 },
});
