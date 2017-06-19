import jwt from 'jsonwebtoken';
import { secretSentence } from '../../../../../etc/secret';

const checkAuth = (req, res, next) => {
  const { token, method, originalUrl: path } = req;
  if ((method === 'POST' && path.substr(0, 9) === '/api/user')
    || path.substr(0, 21) === '/api/me/lost_password'
    || path.substr(0, 22) === '/api/me/reset_password') return next();
  jwt.verify(token, secretSentence, (err, decoded) => {
    if (err) return next({ status: 203, msg: 'authentication has failed' });
    req.decoded = decoded.data;
    next();
  });
};

export default checkAuth;
