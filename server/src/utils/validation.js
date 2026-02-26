const Joi = require('joi');

const criteriaSchema = Joi.object({
    name: Joi.string().required().trim(),
    weight: Joi.number().required().min(0).max(1)
});

const optionSchema = Joi.object({
    name: Joi.string().required().trim(),
    scores: Joi.object().pattern(
        Joi.string(), // key is criteria ID (but we might accept names during creation if simplified, but best is ID)
        Joi.number().min(0).max(10)
    ).optional()
});

const createDecisionSchema = Joi.object({
    title: Joi.string().required().trim().max(100),
    description: Joi.string().allow('').max(500),
    criteria: Joi.array().items(criteriaSchema).min(1).required(),
    options: Joi.array().items(optionSchema).optional()
});

const updateDecisionSchema = Joi.object({
    title: Joi.string().trim().max(100),
    description: Joi.string().allow('').max(500),
    criteria: Joi.array().items(criteriaSchema).min(1),
    options: Joi.array().items(optionSchema)
});

const validate = (schema) => (data) => {
    return schema.validate(data, { abortEarly: false });
};

module.exports = {
    validateCreateDecision: validate(createDecisionSchema),
    validateUpdateDecision: validate(updateDecisionSchema)
};
