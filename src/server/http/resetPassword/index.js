import Joi from 'joi';
import users from '../../models/users';
import { schemaResetPassword } from '../../../lib/validator';

const resetPassword = (req, res) => {
  const { password } = req.body;
  if (Joi.validate(req.body, schemaResetPassword).error) {
    return res.json({ status: 'error', details: 'wrong format' });
  }
  return users.update({ password }, req.id)
       .then(res.status(200).end());
};

export default resetPassword;
