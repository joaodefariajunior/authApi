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

// const loginValidation = data => {

//     const schema = {

//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required()

//     };
//     return Joi.validate(data, schema)
// }

module.exports.registerValidation = registerValidation;
// module.exports.registerValidation = loginValidation;