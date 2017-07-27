import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const getUserFromToken = (config) => async (ctx, next) => {
  const { matchaToken } = ctx;
  const { secretSentence } = config;
  if (!matchaToken) return next();
  try {
    const dataDecoded = jwt.verify(matchaToken, secretSentence);
    if (!dataDecoded) return next();
    const user = await users.load(dataDecoded.sub);
    ctx.user = user;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return next();
    ctx.status = err.status || 201;
    ctx.body = 'Failed to authenticate';
  }
};

export default getUserFromToken;
