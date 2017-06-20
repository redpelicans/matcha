import Joi from 'joi';

const schemaRegister = Joi.object().keys({
  email: Joi.string().email(),
  login: Joi.string().alphanum().min(3).max(30).required(), //eslint-disable-line
  password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
  firstname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
  lastname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
});

// const schemaLogin = Joi.object().keys({
//   email: Joi.string().email(),
//   login: Joi.string().alphanum().min(3).max(30).required(), //eslint-disable-line
//   password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/).required(),
//   firstname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
//   lastname: Joi.string().regex(/^[A-Za-z ]{2,30}$/).required(),
// }).with('username', 'birthyear').without('password', 'access_token');
export default schemaRegister;
