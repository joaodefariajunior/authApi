const Joi = require('@hapi/joi');



const registerValidation =  async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        });
         const result= await schema.validateAsync(data)
         return result;
    } catch (error) {
       console.log(error);
    }
}
const loginValidation =  async (data) => {
    try {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        });
         const result= await schema.validateAsync(data)
         return result;
    } catch (error) {
       console.log(error);
    }
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;