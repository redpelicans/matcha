import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = (secret) => async (ctx, next) => {
  try {
    const { matchaToken } = ctx;
    if (!matchaToken) throw (new Error());
    jwt.verify(matchaToken, secret);
    const decoded = jwt.decode(matchaToken);
    const { sub } = decoded;
    ctx.id = sub;
    const user = await users.load(sub);
    ctx.user = user;
    await next();
  } catch (err) {
    ctx.status = 201;
  }
};

export default checkToken;
