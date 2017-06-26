import R from 'ramda';
import bcrypt from 'bcrypt-as-promised';
import { validateRegisterForm, getIp, getLocalisation, checkAuth, getInfoToUpdate, sendConfirmEmail } from './hooks';

const service = {
  name: 'users',

  login() {

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
    get: [checkAuth],
    post: [validateRegisterForm, getIp, getLocalisation],
    put: [checkAuth, getInfoToUpdate],
    delete: [checkAuth],
  })
  .after({
    post: [sendConfirmEmail],
  });

export default init;
