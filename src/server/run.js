import initHttp from './http';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres';
import initServices from './services';

const run = (config) => initPostgres({ config, startTime: new Date() }) // eslint-disable-line no-shadow
    .then(loadSchema)
    .then(initServices)
    .then(initHttp);

export default run;
