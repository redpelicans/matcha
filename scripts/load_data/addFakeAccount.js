const addFakeAccount = (ctx) => {
  const { db } = ctx;
  const data = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'password!1' };
  return db.one('INSERT INTO users(login,email,password) VALUES(${login}, ${email}, ${password}) RETURNING *', data);
};
export default addFakeAccount;
