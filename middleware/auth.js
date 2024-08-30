const joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/env-variable");

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
});

const registerSchema = joi.object({
    first_name: joi.string().trim().required().min(2),
    last_name: joi.string().trim().required().min(2),
    email: joi.string().trim().required().email().external(async (email) => {
        const user = await User.findOne({ email: email });
        if (user) {
            throw Error("Email address already registered");
        }
    }),
    mobile: joi.string().trim().required().regex(/^[0-9]{10}$/).message({ 'string.pattern.base': "Invalid mobile number" }).external(async (mobile) => {
        const user = await User.findOne({ mobile });
        if (user) {
            throw Error("Mobile number already registered");
        }
    }),
    password: joi.string().trim().required().min(6)
});

exports.loginValidator = (req, res, next) => {
    const valRes = loginSchema.validate(req.body);

    if (valRes.error) {
        return API_RESPONSE.apiFailure(req, res, valRes.error.message, 422);
    }
    next();
}

exports.registerValidator = async (req, res, next) => {
    try {

        const valRes = await registerSchema.validateAsync(req.body);

        if (valRes.error) {
            return API_RESPONSE.apiFailure(req, res, valRes.error.message, 422);
        }
        next();

    } catch (error) {
        return API_RESPONSE.apiFailure(req, res, error.message, 422);
    }
}

exports.isAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return API_RESPONSE.apiFailure(req, res, "token is missing", 404);
    }

    token = token.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            const errorObj ={
                TokenExpiredError: "Token expired",
            };

            const error = errorObj[err.name] || err.message;
            return API_RESPONSE.apiFailure(req, res, error, 401);
        }

        const userData = await User.findOne({ email: decoded.email });
        decoded._id = userData._id;
        req.user = decoded;
        next();
    });

}