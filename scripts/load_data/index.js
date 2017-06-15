import initPostgres from '../../src/server/postgres';
import config from '../../config';
import addFakeAccount from './addFakeAccount';

initPostgres({ config })
  .then(addFakeAccount);
