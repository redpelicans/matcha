import debug from 'debug';
import config from '../../config/server';
import run from './run';

const logger = debug('matcha:server/index.js');

run(config)
  .then(ctx => {
    const { models: { users } } = ctx;
    users.on('login', () => logger('login success'));
    logger('Server started!');
  })
  .catch(err => logger(err.stack));
