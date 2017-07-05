import pgpConnector from 'pg-promise';
import { register } from '.';

const pgp = pgpConnector({ capSQL: true });

const users = {
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id = ${id}`);
  },
  getByEmail(login) {
    return this.db.one('SELECT * FROM users WHERE login = $1', login);
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

  loadBy(filter) {
    const { sexe, age } = filter;
    return this.db.any(`SELECT
      login,
      firstname,
      lastname,
      sexe,
      orientation,
      bio,
      age,
      interest,
      img,
      latitude,
      longitude,
      confirmed FROM users WHERE sexe IN ($1:csv) AND age BETWEEN ${age[0]} AND ${age[1]}`, [sexe]);
  },

  update(data, id) {
    if (data.id) { return (Promise.reject({ msg: 'id can\'t be change' })); }
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },
};

export default register('users', users);
