import R from 'ramda';

const service = {
  name: 'status',
  get() {
    const { startTime, config: { postgres } } = this.globals;
    return Promise.resolve({
      startTime,
      postgres: R.omit('password', postgres),
    });
  },
};

const init = (evtx) => evtx.use(service.name, service);

export default init;
