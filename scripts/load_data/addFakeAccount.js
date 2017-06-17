const addFakeAccount = (ctx) => {
  const { db } = ctx;
  const data = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'password!1' };
  return db.task(t => t.one('SELECT EXISTS (SELECT id FROM users WHERE id=1)::int')
      .then(({ exists }) => {
        if (!exists) return t.one('INSERT INTO users(login,email,password) VALUES(${login}, ${email}, ${password}) RETURNING *').then(() => ctx);
        return ctx;
      }))
};
export default addFakeAccount;
