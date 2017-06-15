const query = "INSERT INTO users (login, email, password, confirmed) VALUES ('abarriel','allan.barrielle@gmail.com','password!1',true)";

const fakeData = ({ db }) => db.query('SELECT login FROM users WHERE id=1')
  .then((res) => {
    if (res[0]) {
      const { login } = res[0];
      return db.query(query).then(() => db);
    } else {
      return db.query(query).then(() => db);
    }
    return db;
  })
  .then((res) => res);

export default fakeData;
