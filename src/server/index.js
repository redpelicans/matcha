import debug from 'debug';
import config from '../../config';
import initHttp from './http';
import ping from './db';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres/index';

const logger = debug('matcha:server/index.js');

initPostgres({ config })
  .then(loadSchema)
  .then(initHttp)
  .then(ping)
  .then(() => logger('Server started'))
  .catch(err => logger(err.stack));
