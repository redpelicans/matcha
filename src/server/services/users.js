import users from '../models/users';

const service = {
  name: 'users',
  get({ id }) {
    return users.load(Number(id));
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
