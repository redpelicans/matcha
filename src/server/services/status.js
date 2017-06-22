import R from 'ramda';

const service = {
  name: 'status',
  get() {
    const { startTime, config: { postgres }, models: { users } } = this.globals;
    return users.ping().then(() => ({
      startTime,
      postgres: { ...R.omit('password', postgres), ping: 'pong' },
    }));
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
