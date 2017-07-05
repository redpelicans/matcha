import socketIo from 'socket.io';
import debug from 'debug';
import initReactor from './reactor';

const logger = debug('matcha:socketio');

const init = (ctx) => {
  const { http, services: { evtx }, config: { secretSentence }, models: { users, likes } } = ctx;
  const io = socketIo(http);
  return initReactor(evtx, io, secretSentence, users, likes).then(reactor => {
    logger('socketIo is setup');
    return { ...ctx, reactor };
  });
};

export default init;
