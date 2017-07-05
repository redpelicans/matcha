import R from 'ramda';
import likes from '../../models/likes';

export const ifAlreadyLiked = (ctx) => {
  const { input: { from, to } } = ctx;
  const { config: { httpCode: { error } } } = ctx.globals;
  return likes.load(from, to)
  .then(() => ctx)
  .catch(() => Promise.reject({ status: error }));
};

export const ifCanLike = (ctx) => {
  const { input: { id, from } } = ctx;
  if (from === id) return Promise.resolve(ctx);
  const { config: { httpCode: { error } } } = ctx.globals;
  return Promise.reject({ status: error });
};

export const ifConnected = (ctx) => {
  const { input: { to }, locals: { usersConnected } } = ctx;
  if (R.indexOf(to, usersConnected) < 0) {
    return Promise.resolve({ ...ctx, input: { ...ctx.input, push: false } });
  }
  return Promise.resolve({ ...ctx, input: { ...ctx.input, push: true } });
};
