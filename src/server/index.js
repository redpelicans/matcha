import debug from 'debug';
import config from '../../config';
import initHttp from './http';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres';

const logger = debug('matcha:server/index.js');

initPostgres({ config })
  .then(loadSchema)
  .then(initHttp)
  .then(() => logger('Server started'))
  .catch(err => logger(err.stack));
