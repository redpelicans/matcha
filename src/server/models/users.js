import pgpConnector from 'pg-promise';
import { register } from '.';

const pgp = pgpConnector({ capSQL: true });

const users = {
  load(data) {
    if (!data.show) {
      return this.db.oneOrNone(`SELECT * FROM users WHERE id = ${data}`)
        .then(res => {
          delete res.password; return res;
        });
    }
    return this.db.oneOrNone("SELECT ${show~} FROM users WHERE ${type^} LIKE \'${value#}\'", data);
  },

  add(data) {
    const query = pgp.helpers.insert(data, null, 'users');
    return this.db.result(`${query} RETURNING id`);
  },

  delete(id) {
    return this.db.result('DELETE FROM users WHERE id=$1', id);
  },

  // loadBy(data) {
  //   const daa = { sexe: 'homme', region: 'paris' };
  //   const query = pgp.helpers.sets(daa).replace(',', ' AND ');
  //   // this method is here for debugging, do not use it in prod. will be delete
  //   return this.db.any('SELECT * FROM users ORDER BY ID ASC');
  // },

  update(data, id) {
    if (data.id) { return (Promise.reject({ msg: 'id can\'t be change' })); }
    const query = `${pgp.helpers.update(data, null, 'users')} WHERE id=${id}`;
    return this.db.result(query);
  },
};

export default register(users);
