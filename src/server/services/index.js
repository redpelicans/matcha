import EvtX from 'evtx';
import debug from 'debug';
import initPing from './ping';
import initStatus from './status';
import initUsers from './users';
import initConfirmEmail from './confirmEmail';

const logger = debug('matcha:services');

const allServices = [
  initPing,
  initStatus,
  initUsers,
  initConfirmEmail,
];

const initServices = (api) => allServices.reduce((acc, service) => acc.configure(service), api);

const init = (ctx) => {
  const evtx = EvtX(ctx).configure(initServices);
  logger('EvtX api setup');
  return Promise.resolve({ ...ctx, services: { evtx } });
};

export default init;
