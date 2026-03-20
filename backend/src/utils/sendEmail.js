import nodemailer from "nodemailer";

const createTransporter = () => {
	const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } =
		process.env;

	if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
		throw new Error(
			"SMTP is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.",
		);
	}

	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT),
		secure: SMTP_SECURE === "true",
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});
};

const sendEmail = async ({ to, subject, text, html }) => {
	const transporter = createTransporter();
	const from = process.env.SMTP_FROM || process.env.SMTP_USER;

	try {
		await transporter.sendMail({
			from,
			to,
			subject,
			text,
			html,
		});
	} catch (err) {
		throw err;
	}
};

export default sendEmail;
