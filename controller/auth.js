const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/env-variable");


exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let userData;

    User.findOne({ email: email }).
        then(user => {
            if (!user) {
                const error = new Error("Invalid email address");
                error.statusCode = 404;
                throw error;
            }
            userData = user;

            return bcrypt.compare(password, user.password);
        }).then(isEqual => {
            if (!isEqual) {
                const error = new Error("Invalid password");
                error.statusCode = 404;
                throw error;
            }

            const userName = userData.first_name + ' ' + userData.last_name;
            const token = jwt.sign(
                {
                    name: userName,
                    email: userData.email
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            const resData = {
                token: token,
                name: userName,
                email: userData.email,
                mobile: userData.mobile
            };

            return API_RESPONSE.apiSuccess(req, res, "Login successfully", resData);
        }).
        catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.register = (req, res, next) => {
    const password = bcrypt.hashSync(req.body.password, 12);

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: password,
        email: req.body.email,
        mobile: req.body.mobile
    });
    user.save().then(result => {
        return API_RESPONSE.apiSuccess(req, res, "Registration successful! Your account has been created successfully", result);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    });
}