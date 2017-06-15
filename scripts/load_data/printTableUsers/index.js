import debug from 'debug';

const logger = debug('matcha:server/postgres/printTableUsers');

const print = (db) => db.query('SELECT * FROM users')
    .then((res) => {
      logger(res);
      return db;
    })
    .catch(err => err);

export default print;
