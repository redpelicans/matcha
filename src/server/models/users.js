import { register } from '.';

const users = {
  load(id) {
    return this.db.one(`SELECT * FROM users WHERE id=${id}`, { id });
  },
  add(data) {
    return this.db.none('INSERT INTO users (login, email, password) VALUES (${login}, ${email}, ${password})', data);
  },
  delete(id) {
    return this.db.none(`DELETE FROM users WHERE id=${id}`, { id });
  },
  print() {
    // this method is here for debugging, do not use it in prod. will be delete
    return this.db.many('SELECT * FROM users ORDER BY ID ASC');
  },
  update(data) {
    const { change, id, set } = data;
    return this.db.none(`UPDATE users SET ${change} = '${set}' WHERE id = ${id}`);
  },
};

export default register(users);
