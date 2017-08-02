import debug from 'debug';
import config from '../../config/server';
import run from './run';

const logger = debug('matcha:server/index.js');

const init = async () => {
  try {
    await run(config);
    logger('Server started!');
  } catch (err) {
    logger(err.stack);
  }
};

init();
