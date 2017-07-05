import initPostgres from '../../src/server/postgres';
import config from '../../config';

const resetTable = (ctx, table) => {
  const { db } = ctx;
  return db.query(`DROP TABLE IF EXISTS ${table}`).then(() => {
    console.log(`${table} drop with success`);
    return ctx;
  });
};

initPostgres({ config })
  .then((ctx) => resetTable(ctx, 'users'))
  .then((ctx) => resetTable(ctx, 'likes'));

// By now, only reset table users - should reset all db any time soon.
// dangerous scripts used because schema of db is not fixed yet.
