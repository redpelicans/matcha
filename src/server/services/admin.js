import R from 'ramda';

const service = {
  name: 'admin',
  ping() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ ping: 'pong' }), 2000)
    });
    //return Promise.resolve({ ping: 'pong' });
  },
  status() {
    const { startTime, config: { postgres }, models: { users } } = this.globals;
    // const connectedUsers = reactor.getConnectedUsers();
    return users.ping().then(() => ({
      startTime,
      // connectedUsers,
      postgres: { ...R.omit('password', postgres), ping: 'pong' },
    }));
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
