import R from 'ramda';
import users from '../../models/users';

const confirmEmail = async (ctx) => {
  try {
    const { id } = ctx.user;
    const user = await users.update({ confirmed: true }, Number(id));
    ctx.body = R.omit(['password'], user);
  } catch (err) {
    ctx.status = err.status || 201;
    ctx.body = 'Failed to authenticate';
  }
};

export default confirmEmail;
