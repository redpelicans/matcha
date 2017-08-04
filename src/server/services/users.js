import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import geolib from 'geolib';
import { validateLoginForm, validateRegisterForm, getIp,
  getLocalisation, checkAuth, getInfoToUpdate, sendConfirmEmail, getToken, getByEmail } from './hooks';
import { loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers } from './hooks/suggestion';


const service = {
  name: 'users',

  checkToken() {
    const { user } = this;
    return Promise.resolve({ user });
  },

  logout() {
    const { user } = this;
    const { socket } = this.locals;
    const { models: { users } } = this.globals;
    users.emit('logout', { user, socket });
    return Promise.resolve({ id: user.id });
  },

  async login({ user, password }) {
    try {
      const { models: { users } } = this.globals;
      const { globals: { config: { secretSentence }, expiresIn } } = this;
      await bcrypt.compare(password, user.password);
      const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
      const { socket } = this.locals;
      users.emit('login', { user, socket });
      return { matchaToken: token };
    } catch (err) {
      const { config: { statusCode: { Unauthorized } } } = this.globals;
      return Promise.reject({ status: Unauthorized, message: 'Bad Password' });
    }
  },

  get() {
    const { user: { id } } = this;
    const { models: { users } } = this.globals;
    return users.load(Number(id)).then((userLoad) => R.omit('password', userLoad));
  },

  getUser({ idUser, user }) {
   // Need to clean this one
    // const { models: { users } } = this.globals;
    // return users.load(Number(idUser)).then((userLoad) => {
    //   const distance = geolib.getDistance(
    //     { latitude: userLoad.latitude, longitude: userLoad.longitude },
    //     { latitude: user.latitude, longitude: user.longitude });
    //   const userloaded = { ...userLoad, distance };
    //   return R.omit('password', userloaded);
    // });
  },

  delete({ id }) {
    const { models: { users } } = this.globals;
    return users.delete(Number(id));
  },

  async add(user) {
    const { models: { users } } = this.globals;
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await users.add(R.assoc('password', hashedPassword, user));
    } catch (err) {
      const { config: { statusCode: { BadRequest } } } = this.globals;
      return Promise.reject({ status: BadRequest, message: 'Failed to register' });
    }
  },

  updateInfos({ id: { id }, infoToUpdate }) {
    // console.log(this);
    const { models: { users } } = this.globals;
    const info = R.filter((single) => { // eslint-disable-line array-callback-return
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
    suggestion: [checkAuth, loadProfil, filterBySexeAge, cleanUser, sortGeoLoc, reduceUsers, buildUsers], // done
    get: [checkAuth],
    getUser: [checkAuth],
    add: [validateRegisterForm, getIp, getLocalisation],
    updateInfos: [checkAuth, getInfoToUpdate],
    delete: [getToken, checkAuth],
    isCheckAndConnected: [getToken, checkAuth],
  })
  .after({
    add: [sendConfirmEmail],
  });

export default init;
