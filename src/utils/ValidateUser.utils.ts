const Joi = require('joi');

export async function validatePassword(Users) {
  const Schema = Joi.object({
    password: Joi.string().required(),
  }).options({ allowUnknown: true });
  return Schema.validate(Users);
}

export async function validateEmail(Users) {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return Schema.validate(Users);
}

export async function validateUser(Users) {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(15).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });
  return Schema.validate(Users);
}
