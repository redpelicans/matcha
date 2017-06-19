import users from '../../../../models/users';
import { password as parser } from '../../../validators/parsers';

const resetPassword = (req, res, next) => {
  const { password } = req.body;
  if (parser(password)) return next({ status: 201, msg: 'wrong password format' });
  users
      .update({ password }, req.id)
      .then(res.json({ status: 200, msg: 'password reseted' }));
};

export default resetPassword;
