import socketIo from 'socket.io';
import debug from 'debug';
import initReactor from './reactor';

const logger = debug('matcha:socketio');

const init = (ctx) => {
  const { http, services: { evtx }, config } = ctx;
  const io = socketIo(http);
  return initReactor(evtx, io, config).then(() => {
    logger('evtx io setup');
    return { ...ctx };
  });
};

export default init;
