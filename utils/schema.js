const Joi = require("joi");

module.exports = {
    UserSchema: {
        register: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(9).max(11),
            passwd: Joi.string().min(8).max(20)
        }),
        login: Joi.object({
            phone: Joi.string().required(),
            passwd: Joi.string().min(8).max(20)
        }),
        addRole: Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),
        addPermit: Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required()
        })
    },
    RoleSchema: {
        add: Joi.object({
            name: Joi.string().required(),
            permits: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional()
        }),
        addPermit: Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    CatSchema: {
        add: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
        }),
        edit: Joi.object({
            name: Joi.string().required()
        })
    },
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}