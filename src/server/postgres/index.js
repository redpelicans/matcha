// import debug from 'debug';
// import createTables from './createTables';
// import putFakeData from './fakeData';
// import printTableUsers from './printTableUsers';
import { connect } from '../db';

// const logger = debug('matcha:postgres.js');

const init = (ctx) => connect(ctx.config)
    .then(client => ({ ...ctx, db: client }));

export default init;
