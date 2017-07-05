import Joi from 'joi';

export const schemaRegister = Joi.object().keys({
  email: Joi.string().email(),
  login: Joi.string().alphanum().min(3).max(30).required(), //eslint-disable-line
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
  firstname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
  lastname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
  age: Joi.number().integer().min(18).max(99)
  .required(),
  sexe: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
});

export const schemaLogin = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(30).required(), //eslint-disable-line
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
});

export const schemaPassword = Joi.object().keys({
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
});
