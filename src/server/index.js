import debug from 'debug';
import config from '../../config';
import initHttp from './http';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres';
import initServices from './services';
const logger = debug('matcha:server/index.js');

initPostgres({ config, startTime: new Date() })
  .then(loadSchema)
  .then(initServices)
  .then(initHttp)
  .then(() => logger('Server started!'))
  .catch(err => logger(err.stack));
