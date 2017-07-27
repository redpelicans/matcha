import EvtX from 'evtx';
import debug from 'debug';
import initAdmin from './admin';
import initUsers from './users';
import initLikes from './likes';

const logger = debug('matcha:services');

const allServices = [
  initAdmin,
  initLikes,
  initUsers,
];

const initServices = (api) => allServices.reduce((acc, service) => acc.configure(service), api);

const init = ctx => {
  // console.log(ctx);
  const evtx = EvtX(ctx).configure(initServices);
  logger('EvtX api setup');
  return Promise.resolve({ ...ctx, services: { evtx } });
};

export default init;
