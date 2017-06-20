import R from 'ramda';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-as-promised';
import mailer from '../http/mailer';
import users from '../models/users';
import schemaRegister from './schema';
// import getToken from '/./getToken';

const service = {
  name: 'users',
  get({ id }) {
    return users.load(Number(id)).then((user) => R.omit('password', user));
  },
  delete(id) {
    return users.delete(Number(id));
  },
  post(user) {
    return bcrypt
      .hash(user.password, 10)
      .then(hashedPassword => {
        user.password = hashedPassword; //eslint-disable-line
        return users.add(user);
      });
  },
  put({ id, infoToUpdate }) {
    return users.update(infoToUpdate, Number(id));
  },

};

const checkAuth = (ctx) => {
  const { globals: { config: { secretSentence } } } = ctx;
  const { req: { token } } = ctx.locals;
  const decoded = jwt.verify(token, secretSentence);
  if (!decoded) return Promise.reject({ ...ctx });
  return Promise.resolve({ ...ctx, input: decoded.sub });
};

const validateSchema = (ctx) => {
  const { input } = ctx;
  const user = input;
  if (Joi.validate(user, schemaRegister)) return Promise.reject({ ...ctx });
  console.log('validateSchema'); // eslint-disable-line
  return Promise.resolve({ ...ctx, input: user });
  // const parser = validator(req.body);
};

const getInfoToUpdate = (ctx) => {
  const { input: id, message: { input: infoToUpdate } } = ctx;
  return Promise.resolve({ ...ctx, input: { id, infoToUpdate } });
};

const sendEmail = (ctx) => {
  const {
    input: { email },
    globals: { config: { secretSentence, expiresIn } },
    output: { id },
  } = ctx;
  const { req: { connection } } = ctx.locals;
  const { server: { url } } = connection;
  const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
  mailer(
  email,
    'Registration - Matcha',
    `Click to verify ${url}/api/users/verify?token=${token}`);
  return Promise.resolve(ctx);
};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    post: [validateSchema],
    put: [checkAuth, getInfoToUpdate],
    delete: [checkAuth],
  })
  .after({
    post: [sendEmail],
  });


export default init;
