import { connect } from '../models';

const init = (ctx) => connect(ctx.config)
    .then(client => ({ ...ctx, db: client }));

export default init;

// ping dans init
