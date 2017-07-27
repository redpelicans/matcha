import { connect } from '../models';

const init = async (ctx) => {
  const { db, models } = await connect(ctx.config);
  return ({ ...ctx, db, models });
};

export default init;
