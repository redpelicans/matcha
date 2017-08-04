import R from 'ramda';

const confirmEmail = (users) => async (ctx) => {
  try {
    const { id, confirmed } = ctx.user;
    // if (confirmed) throw ({ body: 'already register ' }); // eslint-disable-line 
    const user = await users.update({ confirmed: true }, Number(id));
    users.emit('confirmEmail', user);
    ctx.body = R.omit(['password'], user);
  } catch (err) {
    ctx.status = err.status || 201;
    ctx.body = err.body || 'Failed to authenticate';
  }
};

export default confirmEmail;
