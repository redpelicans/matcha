import jwt from 'jsonwebtoken';
import { secretSentence } from '../../../../../etc/secret';

const checkAuth = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, secretSentence, (err, decoded) => {
    if (err) res.send({ status: 'error', message: 'invalid token' });
  });
  next();
};

export default checkAuth;
