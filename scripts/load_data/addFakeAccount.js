import users from '../../src/server/models/users';

const addFakeAccount = () => {
  const user = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'passwd1', firstname: 'allan', lastname: 'barrielle' };
  return users.add(user);
};

export default addFakeAccount;
