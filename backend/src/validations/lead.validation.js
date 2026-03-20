import Joi from "joi";

const statusEnum = ["new", "contacted", "converted"];

export const createLeadSchema = Joi.object({
	name: Joi.string().trim().min(3).max(100).required(),

	email: Joi.string().email().required(),

	phone: Joi.string()
		.pattern(/^[6-9]\d{9}$/)
		.required(),

	status: Joi.string()
		.valid(...statusEnum)
		.default("new"),

	image: Joi.any().optional(),
});

export const updateLeadSchema = Joi.object({
	name: Joi.string().trim().min(3).max(100),

	email: Joi.string().email(),

	phone: Joi.string()
		.pattern(/^[6-9]\d{9}$/)
		.messages({
			"string.pattern.base": "Phone must be a valid 10-digit number",
		}),

	status: Joi.string().valid(...statusEnum),

	image: Joi.any().optional(),
}).min(1); // minimum one field in the body

export const updateStatusSchema = Joi.object({
	status: Joi.string()
		.valid(...statusEnum)
		.required(),
});

export const sendLeadEmailSchema = Joi.object({
	subject: Joi.string().trim().min(1).max(200).required(),
	message: Joi.string().trim().min(1).required(),
});
