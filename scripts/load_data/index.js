import initPostgres from '../../src/server/postgres';
import config from '../../config';
import putFakeData from './fakeData';
import printTableUsers from './printTableUsers';

initPostgres({ config })
  .then(putFakeData)
  .then(printTableUsers);
