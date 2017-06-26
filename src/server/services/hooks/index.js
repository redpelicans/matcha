import jwt from 'jsonwebtoken';
import Joi from 'joi';
import geoip from 'geoip-lite';
// import R from 'ramda';
import schemaRegister from './schema';
import mailer from '../../http/mailer';

export const validateRegisterForm = (ctx) => {
  const { input } = ctx;
  const user = input;
  if (Joi.validate(user, schemaRegister).error) {
    const { config: { httpCode: { BadRequest } } } = ctx.globals;
    return Promise.reject({ status: BadRequest });
  }
  // console.log('validateRegisterForm'); // eslint-disable-line
  return Promise.resolve({ ...ctx, input: user });
};

export const checkIfConfirmed = (ctx) => {
  const { globals: { models: { users } }, input: { id } } = ctx;
  // console.log('checkIfConfirmed'); // eslint-disable-line
  return users.load(id).then(user => {
    if (user.confirmed) {
      const { config: { httpCode: { error } } } = ctx.globals;
      return Promise.reject({ ...ctx, status: error });
    }
    return Promise.resolve({ ...ctx, input: id });
  });
};

export const sendConfirmEmail = (ctx) => {
  // console.log('sendConfirmEmail'); // eslint-disable-line
  if (process.env.NODE_ENV === 'testing') return Promise.resolve(ctx);
  const {
    input: { email },
    globals: { config: { secretSentence, expiresIn, routes: { confirmEmail } } },
    output: { id },
    locals: { req: { connection: { server: { url } } } },
  } = ctx;
  const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
  mailer(email,
    'Registration - Matcha',
    `Click to confirm your email:  ${url}/${confirmEmail}?token=${token}`);
  return Promise.resolve(ctx);
};

export const checkAuth = (ctx) => {
  const {
    globals: { config: { secretSentence } },
    locals: { req: { matchaToken } },
  } = ctx;
  const { config: { httpCode: { Unauthorized } } } = ctx.globals;
  if (!matchaToken) return Promise.reject({ status: Unauthorized });
  const tokenDataDecoded = jwt.verify(matchaToken, secretSentence);
  if (!tokenDataDecoded) return Promise.reject({ status: Unauthorized });
  return Promise.resolve({ ...ctx, input: { id: tokenDataDecoded.sub } });
};

export const getInfoToUpdate = (ctx) => {
  // console.log('getInfoToUpdate'); // eslint-disable-line
  // console.log(ctx.message);
  const { input: id, message: { input: infoToUpdate } } = ctx;
  return Promise.resolve({ ...ctx, input: { id, infoToUpdate } });
};

export const getIp = (ctx) => {
  const {
    input: user,
    locals: { req },
  } = ctx;
  let ip = req.connection.remoteAddress;
  if (ip === '127.0.0.1') ip = '62.210.34.191';
  return Promise.resolve({ ...ctx, input: { user, ip } });
};

export const getLocalisation = (ctx) => {
  const { input: { user, ip } } = ctx;
  const geo = geoip.lookup(ip);
  const range = { latitude: geo.ll[0], longitude: geo.ll[1] };
  const userWithRange = Object.assign(user, range);
  return Promise.resolve({ ...ctx, input: userWithRange });
};
