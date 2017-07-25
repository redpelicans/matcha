import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = (req, res, next) => {
  if (!req.matchaToken) return next({ status: 201 });
  const decoded = jwt.decode(req.matchaToken);
  const { sub } = decoded;
  req.id = sub;
  users.load(sub)
    .then((user) => jwt.verify(req.matchaToken, user.password, (err) => {
      if (err) return next({ status: 201 });
      req.secret = user.password;
      next();
    }));
};

export default checkToken;
