import { register } from '.';
import { PreparedStatement as PS } from 'pg-promise';

const users = {
  load(data) {
    const { id, show } = data;
    if (show.includes('password')) { return (Promise.reject(new Error('Password can\'t be printed'))); }
    console.log(data);
    return this.db.one('SELECT ${show~} FROM users WHERE id= $1', id, data); // eslint-disable-line
  },
  add(data) {
    return this.db.one('INSERT INTO users (login, email, password) VALUES (${login}, ${email}, ${password}) RETURNING id', data);
  },
  delete(id) {
    return this.db.none(`DELETE FROM users WHERE id=${id}`, { id });
  },
  loadAll() {
    // filter ALL
    // this method is here for debugging, do not use it in prod. will be delete
    return this.db.many('SELECT * FROM users ORDER BY ID ASC');
  },
  update(changes) {
    // const { change, id, set } = data;
    // if for exemple id so forbidden
    // const { key, value
    // filter
    return this.db.none(`UPDATE users SET ${change} = '${set}' WHERE id = ${id}`);
  },
};

export default register(users);
