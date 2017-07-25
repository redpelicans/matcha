import pgpConnector from 'pg-promise';
import { register } from '.';

const pgp = pgpConnector({ capSQL: true });

const users = {
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id = ${id}`);
  },
  getByEmailVerif(email) {
    return this.db.one('SELECT * FROM users WHERE email = $1', email);
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
      id,
      login,
      firstname,
      lastname,
      sexe,
      orientation,
      bio,
      age,
      interest,
      photo_5,
      latitude,
      longitude,
      confirmed FROM users WHERE sexe IN ($1:csv) AND age BETWEEN ${age[0]} AND ${age[1]}`, [sexe]);
  },

  addImg(imgs, imgProfile, id) {
    if (!imgProfile && !imgs.photo_1) return Promise.reject({ status: 'no files' });
    if (!imgProfile) return this.db.one(`${pgp.helpers.update(imgs, null, 'users')} WHERE id=${id} RETURNING *`);
    const data = { ...imgs, photo_5: imgProfile };
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },

  update(data, id) {
    if (data.id) { return (Promise.reject({ msg: 'id can\'t be change' })); }
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id} RETURNING *`;
    return this.db.one(query);
  },
};

export default register('users', users);
