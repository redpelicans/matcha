import R from 'ramda';
import users from '../models/users';

const service = {
  name: 'status',
  get() {
    const { startTime, config: { postgres } } = this.globals;
    return users.ping().then(() => ({
      startTime,
      postgres: { ...R.omit('password', postgres), ping: 'ok' },
    }));
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
