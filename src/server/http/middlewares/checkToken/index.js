import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = (req, res, next) => {
  if (!req.token) return next({ status: 203, msg: 'authentication has failed' });
  const decoded = jwt.decode(req.token);
  const { email, id } = decoded.data;
  req.id = id;
  users.load({ type: 'email', value: email, show: ['password'] })
    .then((resp) => {
      req.secret = resp.password;
      return jwt.verify(req.token, req.secret, (err) => {
        if (err) return next({ status: 203, msg: 'authentication has failed' });
        next();
      });
    });
};

export default checkToken;
