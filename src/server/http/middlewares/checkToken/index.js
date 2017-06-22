import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const checkToken = (req, res, next) => {
  if (!req.token) return next({ status: 201 });
  const decoded = jwt.decode(req.token);
  const { id } = decoded;
  req.id = id;
  users.load(id)
    .then((user) => jwt.verify(req.token, user.password, (err) => {
      if (err) return next({ status: 201 });
      req.secret = user.password;
      next();
    }));
};

export default checkToken;
