import debug from 'debug';
import config from '../../config/server';
import run from './run';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    const ctx = await run(config);
    // const { models: { users } } = ctx;
    // users.on('login', () => logger('login success'));
    logger('Server started!');
  } catch (err) {
    console.log('error');
    logger(err.stack);
  }
};

init();
