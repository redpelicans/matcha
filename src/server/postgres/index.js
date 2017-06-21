import { connect } from '../models';

const init = (ctx) => connect(ctx.config).then(({ db, models }) => ({ ...ctx, db, models }));

export default init;
