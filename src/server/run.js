import initHttp from './http';
import loadUserSchema from './postgres/loadUserSchema';
import loadEventSchema from './postgres/loadEventSchema';
import initPostgres from './postgres';
import initServices from './services';
import initSocketIo from './socketio';
import addFakeAccounts from './postgres/__test__/addFakeAccounts';

const run = (config) => initPostgres({ config, startTime: new Date() }) // eslint-disable-line no-shadow
    .then(loadUserSchema)
    .then(loadEventSchema)
    .then(initServices)
    .then(initHttp)
    .then(initSocketIo);
    // .then((ctx) => {
    //   const { users } = ctx.models;
    //   return users.deleteAll().then(() => ctx);
    // })
    // .then(addFakeAccounts);

export default run;
