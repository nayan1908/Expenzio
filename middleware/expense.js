const joi = require("joi");

const addSchema = joi.object({
    title : joi.string().trim().required().min(2),
    description: joi.string().trim(),
    price: joi.number().required().greater(0),
    date: joi.date().required(),
    tag: joi.array(),
});

exports.addExpValidator = (req, res, next) => {
    const valRes = addSchema.validate(req.body);
    if(valRes.error){
        return API_RESPONSE.apiFailure(req, res, valRes.error.message, 422);
    }
    next();
}