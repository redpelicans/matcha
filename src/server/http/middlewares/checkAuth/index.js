import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = (secret) => (req, res, next) => {
  if (!req.matchaToken) return next({ status: 201 });
  const decoded = jwt.decode(req.matchaToken);
  const { sub } = decoded;
  req.id = sub;
  users.load(sub)
    .then((user) => jwt.verify(req.matchaToken, secret, (err) => {
      if (err) return next({ status: 201 });
      req.user = user;
      next();
    }));
};

export default checkToken;
