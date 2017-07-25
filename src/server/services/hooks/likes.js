import R from 'ramda';
import likes from '../../models/likes';

export const ifAlreadyLiked = (ctx) => {
  const { idUser: { from, to } } = ctx.input;
  const { config: { httpCode: { error } } } = ctx.globals;
  return likes.load(from, to)
  .then(() => ctx)
  .catch(() => Promise.reject({ status: error }));
};

export const ifCanLike = (ctx) => {
  const { idUser: { from, to } } = ctx.input;
  if (from !== to) return Promise.resolve(ctx);
  const { config: { httpCode: { error } } } = ctx.globals;
  return Promise.reject({ status: error });
};

export const ifConnected = (ctx) => {
  const { idUser: { to } } = ctx.input;
  const { locals: { usersConnected } } = ctx;
  const listUsersConnected = usersConnected();
  if (R.indexOf(to, listUsersConnected) < 0) {
    return Promise.resolve({ ...ctx, input: { ...ctx.input, push: false } });
  }
  return Promise.resolve({ ...ctx, input: { ...ctx.input, push: true } });
};
