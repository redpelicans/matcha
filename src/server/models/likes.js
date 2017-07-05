import pgpConnector from 'pg-promise';
import { register } from '.';

const pgp = pgpConnector({ capSQL: true });

const likes = {
  load(from, to) {
    return this.db.none(`SELECT * FROM likes WHERE to_user = ${to} AND from_user = ${from}`);
  },
  add(data) {
    const query = pgp.helpers.insert(data, null, 'likes');
    return this.db.one(`${query} RETURNING *`);
  },
  delete(from, to) {
    return this.db.one(`DELETE FROM likes WHERE to_user = ${to} AND from_user = ${from} RETURNING *`);
  },
};

export default register('likes', likes);
