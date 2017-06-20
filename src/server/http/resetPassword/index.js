import users from '../../models/users';
import { password as parser } from '../validators/parsers';

const resetPassword = (req, res, next) => {
  const { password } = req.body;
  if (parser(password)) return next({ status: 202 });
  users.update({ password }, req.id)
       .then(res.status(200).end());
};

export default resetPassword;
