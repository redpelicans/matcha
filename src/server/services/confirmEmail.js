import R from 'ramda';
import { checkAuth, checkIfConfirmed } from './hooks';

const service = {
  name: 'confirm_email',

  get(id) {
    const { models: { users } } = this.globals;
    return users.update({ confirmed: true }, Number(id)).then(user => R.omit('password', user));
  },
};

const init = (evtx) => evtx
  .use(service.name, service)
  .service(service.name)
  .before({ get: [checkAuth, checkIfConfirmed] });

export default init;
