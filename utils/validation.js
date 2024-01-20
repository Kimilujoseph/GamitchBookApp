//validation using joi

const Joi = require('joi');

const submissionvalidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .max(20)
            .required(),

        twitter: Joi.string()
            .min(5)
            .max(30),

        facebook: Joi.string()
            .min(5)
            .max(30),

        linkedn: Joi.string()
            .min(5)
            .max(30),

        biography: Joi.string()
            .min(5)
            .max(300)
            .required(),

        awards: Joi.string()
            .min(1)
            .max(20),

        authorquotes: Joi.string()
            .min(5)
            .max(50),

        image: Joi.string()
            .required(),

        nameofthebook: Joi.string()
            .min(3)
            .max(20)
            .required(),

        imageofthebook: Joi.string()
            .min(3)
            .max(20)
            .required(),

        publisher: Joi.string()
            .required(),

        publishingdate: Joi.date()
            .required(),

        aboutthebook: Joi.string()
            .min(10)
            .max(200),


        rating: Joi.number()
            .required(),

        genre: Joi.string()
            .min(2)
            .max(20)
            .required(),

        review: Joi.string()
            .min(2)
            .max(100)
            .required(),

        cost: Joi.string()
            .required()

    })

    return schema.validate(data)
}

const emailValidation = (data) => {
    const emailSchema = Joi.object({
        email: Joi.string()
            .email()
            .required()
    })

    return emailSchema.validate(data)
}

const AdminValidation = (data) => {
    const adminSchema = Joi.object({
        username: Joi.string()
            .min(6)
            .max(20)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .required()
    })

    return adminSchema.validate(data)
}

const loginAdminValidation = (data) => {
    const loginSchema = Joi.object({
        username: Joi.string()
            .min(6)
            .max(20)
            .required(),
        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .min(8)
            .max(30)
            .required()
    })

    return loginSchema.validate(data);
}

const userSignIn = (userData) => {
    const userSchema = Joi.object({
        usershema: Joi.string()
            .min(2)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        passsword: Joi.string()
            .min(8)
            .max(30)
            .required(),

    })
    return userSchema.validate(userData)
}

module.exports.submissionvalidation = submissionvalidation;
module.exports.emailValidation = emailValidation;
module.exports.AdminValidation = AdminValidation;
module.exports.loginAdminValidation = loginAdminValidation;
module.exports.userSignIn = userSignIn;