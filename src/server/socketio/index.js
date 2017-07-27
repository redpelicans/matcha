import socketIo from 'socket.io';
import debug from 'debug';
import initReactor from './reactor';

const logger = debug('matcha:socketio');

const init = async (ctx) => {
  const { http, services: { evtx }, config: { secretSentence }, models: { users, likes } } = ctx;
  const io = socketIo(http);
  const { getConnectedUsers } = await initReactor(evtx, io, secretSentence, users, likes);
  logger('socketIo is setup');
  const usersConnectedList = getConnectedUsers();
  return { ...ctx, usersConnectedList };
};

export default init;
