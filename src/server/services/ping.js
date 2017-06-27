const service = {
  name: 'admin',
  ping() {
    return Promise.resolve({ ping: 'pong' });
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
