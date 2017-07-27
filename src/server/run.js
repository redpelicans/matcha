import initHttp from './http';
import loadUserSchema from './postgres/loadUserSchema';
import loadEventSchema from './postgres/loadEventSchema';
import initPostgres from './postgres';
import initServices from './services';
import initSocketIo from './socketio';
// import addFakeAccounts from './postgres/__test__/addFakeAccounts';

const run = async (config) => {
  let ctx = await initPostgres({ config, startTime: new Date() }); // eslint-disable-line no-shadow
  ctx = await loadUserSchema(ctx);
  ctx = await loadEventSchema(ctx);
  ctx = await initServices(ctx);
  ctx = await initHttp(ctx);
  ctx = await initSocketIo(ctx);
  return ctx;
};
    // .then((ctx) => {
    //   const { users } = ctx.models;
    //   return users.deleteAll().then(() => ctx);
    // });

export default run;
