import debug from 'debug';
import pgp from 'pg-promise';

const logger = debug('matcha:db.js');
const pgConnector = pgp();

export const connect = ({ postgres: config }) => {
  const db = pgConnector(config);
  return db.connect()
  .then(client => client);
};

// export const ping = () => {
//
// };

// test
// create schema create table if not exi, table user if exist = delete or not ??????
// affihce rinfo
