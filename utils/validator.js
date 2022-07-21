const jwt = require("jsonwebtoken");
const UserDB = require("../models/user");
const RoleDB = require("../models/role");

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            if (req.body) {
                const result = schema.validate(req.body);
                if (result.error) {
                    next(new Error(result.error.details[0].message));
                } else {
                    next();
                }
            } else {
                next(new Error("Body is Empty!"))
            }
        }
    }
    ,
    validateParams: (schema, name) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${name}`] = req.params[`${name}`];
            const result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },
    validateToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if (token) {
            try {
                token = token.split(" ")[1];
                let decoded = jwt.decode(token, process.env.SECRET_KEY);
                let user = await UserDB.findById(decoded._id).select("-passwd -__v");
                if (user) {
                    req.user = user;
                    next();
                } else {
                    next(new Error("Tokenization Error!"))
                }
            } catch (error) {
                next(new Error(error));
            }
        } else {
            next(new Error("You are not login!"))
        }
    },
    validateRole: (role) => {
        return async (req, res, next) => {
            if (req.user) {
                let loginUser = await UserDB.findById(req.user._id).select("-passwd -__v");
                let dbRole = await RoleDB.findOne({ name: role });
                let findRole = loginUser.roles.find(roleid => roleid.equals(dbRole._id));
                if (findRole) {
                    next();
                } else {
                    next(new Error("You don't have permision!"));
                }
            } else {
                next(new Error("You are not login!"));
            }
        }
    }
}