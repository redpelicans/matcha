import initHttp from './http';
import loadUserSchema from './postgres/loadUserSchema';
import loadEventSchema from './postgres/loadEventSchema';
import initPostgres from './postgres';
import initServices from './services';
import initSocketIo from './socketio';

const run = (config) => initPostgres({ config, startTime: new Date() }) // eslint-disable-line no-shadow
    .then(loadUserSchema)
    .then(loadEventSchema)
    .then(initServices)
    .then(initHttp)
    .then(initSocketIo);

export default run;
