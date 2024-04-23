const Joi = require('joi');

const userJSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(10).max(90),
    createdAt: Joi.boolean(),
    name: Joi.string().required().required(),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password : Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_$%])[A-Za-z0-9@_$%]{8,}$')).required()
});

module.exports = {userJSchema}

// access_token: [
//     Joi.string(),
//     Joi.number()
// ],
