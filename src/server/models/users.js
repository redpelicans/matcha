import pgpConnector from 'pg-promise';
import { register } from '.';

const pgp = pgpConnector({ capSQL: true });

const users = {
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id = ${id}`);
  },
  getByEmail(email) {
    return this.db.one('SELECT * FROM users WHERE login = $1', email);
  },
  add(data) {
    const query = pgp.helpers.insert(data, null, 'users');
    return this.db.one(`${query} RETURNING *`);
  },
  delete(id) {
    return this.db.one('DELETE FROM users WHERE id=$1 RETURNING *', id);
  },
  deleteAll() {
    return this.db.any('DELETE FROM users');
  },

  // loadBy(data) {
  //   const daa = { sexe: 'homme', region: 'paris' };
  //   const query = pgp.helpers.sets(daa).replace(',', ' AND ');
  //   // this method is here for debugging, do not use it in prod. will be delete
  //   return this.db.any('SELECT * FROM users ORDER BY ID ASC');
  // },

  update(data, id) {
    if (data.id) { return (Promise.reject({ msg: 'id can\'t be change' })); }
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },
};

export default register('users', users);
