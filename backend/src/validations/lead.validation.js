import Joi from "joi";

export const createLeadSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().min(10).required(),
});

export const updateLeadSchema = Joi.object({
	name: Joi.string().min(3),
	email: Joi.string().email(),
	phone: Joi.string().min(10),
	status: Joi.string().valid("new", "contacted", "converted"),
});

export const updateStatusSchema = Joi.object({
	status: Joi.string().valid("new", "contacted", "converted").required(),
});
