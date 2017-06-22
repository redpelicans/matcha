import debug from 'debug';
import config from '../../config';
import initHttp from './http';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres';
import initServices from './services';

const logger = debug('matcha:server/index.js');

export const run = (config) => initPostgres({ config, startTime: new Date() }) // eslint-disable-line no-shadow
    .then(loadSchema)
    .then(initServices)
    .then(initHttp);

run(config)
  .then(() => logger('Server started!'))
  .catch(err => logger(err.stack));
