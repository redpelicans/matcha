import Joi from 'joi';
import bcrypt from 'bcrypt-as-promised';
import users from '../../models/users';
import { schemaResetPassword } from '../../../lib/validator';

const resetPassword = async (ctx) => {
  try {
    const { password } = ctx.request.body;
    if (Joi.validate(ctx.request.body, schemaResetPassword).error) throw (new Error());
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.update({ password: hashedPassword }, ctx.id);
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status || 201;
    ctx.body = 'failed to authenticate / wrong format';
  }
};

export default resetPassword;
