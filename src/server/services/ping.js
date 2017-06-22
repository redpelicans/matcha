const service = {
  name: 'ping',
  get() {
    return Promise.resolve({ ping: 'pong' });
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
