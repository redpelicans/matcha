import socketIo from 'socket.io';
import debug from 'debug';
import initReactor from './reactor';

const logger = debug('matcha:socketio');

const init = (ctx) => {
  const { http, services: { evtx }, config: { secretSentence }, models: { users } } = ctx;
  const io = socketIo(http);
  return initReactor(evtx, io, secretSentence, users).then(() => {
    logger('socketIo is setup');
    return ctx;
  });
};

export default init;
