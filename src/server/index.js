import debug from 'debug';
import config from '../../config';
import run from './run';

const logger = debug('matcha:server/index.js');

run(config)
  .then(() => logger('Server started!'))
  .catch(err => logger(err.stack));
