import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import geolib from 'geolib';
import { validateLoginForm, validateRegisterForm, getIp,
  getLocalisation, checkAuth, getInfoToUpdate, sendConfirmEmail, getToken, getByEmail } from './hooks';
import { loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers } from './hooks/suggestion';


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
      return { matchaToken: token, id: user.id };
    });
  },

  get({ id }) {
    const { models: { users } } = this.globals;
    return users.load(Number(id)).then((userLoad) => R.omit('password', userLoad));
  },

  getUser({ idUser, user }) {
    const { models: { users } } = this.globals;
    return users.load(Number(idUser)).then((userLoad) => {
      const distance = geolib.getDistance(
        { latitude: userLoad.latitude, longitude: userLoad.longitude },
        { latitude: user.latitude, longitude: user.longitude });
      const userloaded = { ...userLoad, distance };
      return R.omit('password', userloaded);
    });
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
    const info = R.filter((single) => {
      if (typeof single === 'object' && single.length !== 0) return true;
      if (typeof single === 'string' && single !== '') return true;
    }, infoToUpdate);
    return users.update(info, Number(id));
  },

  suggestion({ users }) {
    return Promise.resolve({ listUser: users });
  },

  isCheckAndConnected({ user }) {
    return Promise.resolve({ user });
  },

};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({
    logout: [checkAuth],
    login: [validateLoginForm, getByEmail],
    suggestion: [checkAuth, loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers],
    get: [checkAuth],
    getUser: [checkAuth],
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [getToken, checkAuth],
    isCheckAndConnected: [getToken, checkAuth],
  })
  .after({
    post: [sendConfirmEmail],
  });

export default init;
