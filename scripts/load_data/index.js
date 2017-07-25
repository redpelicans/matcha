import initPostgres from '../../src/server/postgres';
import config from '../../config/server';
import addFakeAccount from './addFakeAccount';

initPostgres({ config })
  .then(addFakeAccount);
