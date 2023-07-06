const Joi = require('joi');



const validateUsers = (data) => {
    const usersSchema = Joi.object({
        surname: Joi.string().required(),
        othernames: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        dob: Joi.date().required(),
        phone: Joi.string().required(),
        repeat_password: Joi.ref('password'),
        gender: Joi.string().required()
   
    })
    return usersSchema.validate(data);
    
}

module.exports = validateUsers