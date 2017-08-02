import debug from 'debug';
import jwt from 'jsonwebtoken';

const logger = debug('matcha:socketio:reactor');

const formatServiceMethod = (ctx) => {
  const { service, method, message: { type, payload } } = ctx;
  if (service && method) return Promise.resolve(ctx);
  const [serv, meth] = type.split(':');
  return Promise.resolve({
    ...ctx,
    input: payload,
    service: serv,
    method: meth,
  });
};

const makeOutput = (payload, type) => ({ payload, type });

const formatResponse = (ctx) => {
  const { output, message: { replyTo } } = ctx;
  if (replyTo) {
    return Promise.resolve({
      ...ctx,
      output: makeOutput(output, replyTo),
    });
  }
  return Promise.resolve(ctx);
};

const getToken = (ctx) => {
  const { message: { matchaToken } } = ctx;
  return Promise.resolve({ ...ctx, matchaToken });
};

const getUserFromToken = async (ctx) => {
  const { globals: { config: { secretSentence }, models: { users } }, matchaToken } = ctx;
  if (!matchaToken) return Promise.resolve(ctx);
  const dataDecoded = jwt.verify(matchaToken, secretSentence);
  if (!dataDecoded) return Promise.resolve(ctx);
  try {
    const user = await users.load(dataDecoded.sub);
    return ({ ...ctx, user });
  } catch (err) {
    return ({ ...ctx });
  }
};

class Reactor {
  constructor(evtx, io, secretKey, users, likes) {
    this.io = io;
    this.secretKey = secretKey;
    this.evtx = evtx;
    this.users = users;
    this.likes = likes;
    this.socket = {};
    this.sockets = {};
    this.initModels();
    this.initEvtX();
    this.initIo();
  }


  initModels() {
    const registerUser = ({ user, socket }) => {
      logger(`user ${user.firstname} logged in socket.id = ${socket.id}`);
      this.sockets[socket.id] = user;
    };
    const logoutUser = ({ user, socket }) => {
      logger(`user ${user.firstname} logged out`);
      delete this.sockets[socket.id];
    };
    const addLike = ({ from, to, push }) => {
      logger(from, to, push);
    };

    const unLike = ({ from, to }) => {
      logger(from, to);
    };

    const confirmEmail = (user) => {
      logger('confirmEmail Emitter');
      this.socket.emit('action', { type: 'confirmEmail', payload: { user } });
    };

    this.users.on('login', registerUser);
    this.users.on('logout', logoutUser);
    this.likes.on('addLike', addLike);
    this.users.on('confirmEmail', confirmEmail);
    this.likes.on('unLike', unLike);
  }

  getConnectedUsers() {
    logger('getConnectedUsers');
    const usersConnected = [];
    Object.values(this.sockets).forEach(user => {
      usersConnected.push(user.id);
    });
    return usersConnected;
  }

  initEvtX() {
    this.evtx
      .before(formatServiceMethod, getToken, getUserFromToken)
      .after(formatResponse);
  }

  initIo() {
    const { evtx, io } = this;
    io.on('connection', (socket) => {
      this.socket = socket;
      socket.on('action', (message, cb) => {
        logger(`receive ${message.type} action`);
        const localCtx = { io, socket, usersConnected: this.getConnectedUsers.bind(this) };
        evtx.run(message, localCtx)
          .then((res) => {
            if (cb) {
              logger(`answer ${message.type} action`);
              return cb(null, res);
            }

            // const connected = this.getConnectedUsers();
            // if (res.type === 'isConnected') {
            //   if (connected.includes(res.payload.user.id)) return socket.emit('action', { ...res, payload: { ...res.payload, connected: true } });
            //   return socket.emit('action', { ...res, payload: { ...res.payload, connected: false } });
            // }
            logger(`answer ${res.type} action`);
            socket.emit('action', res);
          })
          .catch((err) => {
            let res = {};
            if (!err.status) {
              res = { status: err.detail, routine: err.routine };
            } else res = { status: err.status };
            if (cb) return cb(res);
            socket.emit('action', { type: 'EvtX:Error', ...res });
          });
      });
    });
  }
}

const init = ((evtx, io, secretKey, users, likes) => {
  const reactor = new Reactor(evtx, io, secretKey, users, likes);
  return Promise.resolve({ getConnectedUsers() { return reactor.getConnectedUsers(); } });
});

export default init;
