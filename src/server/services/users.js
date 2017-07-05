import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import { validateLoginForm, validateRegisterForm, getIp,
  getLocalisation, checkAuth, getInfoToUpdate, sendConfirmEmail, getToken, getByEmail } from './hooks';
import { loadProfil, filterBySexeAge, cleanUser, sortGeoLoc } from './hooks/suggestion';

const service = {
  name: 'users',

  logout(user) {
    const { socket } = this.locals;
    const { models: { users } } = this.globals;
    users.emit('logout', { user, socket });
  },

  login({ user, password }) {
    const { models: { users } } = this.globals;
    return bcrypt.compare(password, user.password).then(() => {
      const { globals: { config: { secretSentence }, expiresIn } } = this;
      const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
      const { socket } = this.locals;
      users.emit('login', { user, socket });
      return token;
    });
  },

  get({ id }) {
    const { models: { users } } = this.globals;
    return users.load(Number(id)).then((user) => R.omit('password', user));
  },

  delete({ id }) {
    const { models: { users } } = this.globals;
    return users.delete(Number(id));
  },

  post(user) {
    const { models: { users } } = this.globals;
    return bcrypt.hash(user.password, 10)
    .then(hashedPassword => users.add(R.assoc('password', hashedPassword, user)));
  },

  put({ id: { id }, infoToUpdate }) {
    const { models: { users } } = this.globals;
    return users.update(infoToUpdate, Number(id));
  },
};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    logout: [checkAuth],
    login: [validateLoginForm, getByEmail],
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
