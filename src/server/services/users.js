import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import { validateRegisterForm, getIp, getLocalisation, checkAuth, getInfoToUpdate, sendConfirmEmail, getToken } from './hooks';
import { loadProfil, filterBySexeAge, cleanUser, sortGeoLoc } from './hooks/suggestion';
import users from '../models/users';

const service = {
  name: 'users',

  login({ login, password }) {
    return users.getByEmail(login)
    .then((user) => {
      if (!user.confirmed) return Promise.reject({ status: 'Unauthorized' });
      return bcrypt.compare(password, user.password).then(() => {
        const { globals: { config: { secretSentence }, expiresIn } } = this;
        const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
        // users.emit('login', user);
        return token;
      });
    });
  },

  get({ id }) {
    return users.load(Number(id)).then((user) => R.omit('password', user));
  },

  delete({ id }) {
    return users.delete(Number(id));
  },

  post(user) {
    console.log('post model user');
    return bcrypt.hash(user.password, 10)
    .then(hashedPassword => users.add(R.assoc('password', hashedPassword, user)));
  },

  put({ id: { id }, infoToUpdate }) {
    console.log('put model user');
    return users.update(infoToUpdate, Number(id));
  },
};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    // login: [validateLoginForm, getByEmail, login]
    suggestion: [checkAuth, loadProfil, filterBySexeAge, cleanUser, sortGeoLoc],
    get: [checkAuth],
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [getToken, checkAuth],
  })
  .after({
    post: [sendConfirmEmail],
  });

export default init;
