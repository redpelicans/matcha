import initPostgres from '../../src/server/postgres';
import config from '../../config';

const resetTable = ({ db }, table) => db.query(`DROP TABLE IF EXISTS ${table}`);

initPostgres({ config })
  .then((ctx) => resetTable(ctx, 'users'))
  .then(() => console.log('success'));


// By now, only reset table users - should reset all db any time soon.
// dangerous scripts used because schema of db is not fixed yet.
