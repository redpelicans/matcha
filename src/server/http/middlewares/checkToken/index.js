import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = async (ctx, next) => {
  try {
    const { matchaToken } = ctx;
    if (!matchaToken) throw (new Error());
    const decoded = jwt.decode(matchaToken);
    const { sub } = decoded;
    ctx.id = sub;
    const user = await users.load(sub);
    jwt.verify(matchaToken, user.password);
    ctx.secret = user.password;
    await next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return next();
    ctx.status = err.status || 201;
    ctx.body = 'Failed to authenticate';
    throw err;
  }
};

export default checkToken;
