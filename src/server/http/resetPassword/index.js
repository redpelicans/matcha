import Joi from 'joi';
import bcrypt from 'bcrypt-as-promised';
import users from '../../models/users';
import { schemaResetPassword } from '../../../lib/validator';

const resetPassword = (req, res, next) => {
  const { password } = req.body;
  if (Joi.validate(req.body, schemaResetPassword).error) {
    return next({ details: 'wrong format' });
  }
  return bcrypt.hash(password, 10)
      .then(hashedPassword => users.update({ password: hashedPassword }, req.id));
};

export default resetPassword;
