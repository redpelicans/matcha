import cookieParser from 'socket.io-cookie';
import debug from 'debug';
import users from '../models/users';

const logger = debug('matcha:socketio');

const formatServiceMethod = (ctx) => {
  const { service, method, message: { type, payload } } = ctx;
  if (service && method) return Promise.resolve(ctx);
  const [serv, meth] = type.split(':');
  console.log(service, method);
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


const getToken = (socket, next) => {
  // const token = socket.request.headers.cookie.matchaToken || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTg2NDM2OTIsImV4cCI6MTUzMDE3OTcyNCwiYXVkIjoiIiwic3ViIjoiMSJ9.R_5B1rdr39y5ay9PNGgFbWUyS6JrXdlAv58sBdq8X6Q';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTg2NDM2OTIsImV4cCI6MTUzMDE3OTcyNCwiYXVkIjoiIiwic3ViIjoiMSJ9.R_5B1rdr39y5ay9PNGgFbWUyS6JrXdlAv58sBdq8X6Q';
  if (!token) {
    logger('No token providen');
    return next(new Error('No token providen'));
  }
  return users.getFromToken(token)
    .catch(err => next(err))
    .then(user => {
      // console.log(user);
      // const sessionId = socket.handshake.query.sessionId;
      // register.add(user, socket, token, sessionId);
      socket.request.user = user; // eslint-disable-line
      next();
    });
};

class Reactor {
  constructor(evtx, io, config) {
    this.io = io;
    this.config = config;
    this.evtx = evtx;
    this.initEvtX();
    this.initIO();
  }

  initEvtX() {
    this.evtx
      .before(formatServiceMethod)
      .after(formatResponse);
  }

  initIO() {
    //  only secretsentence
    const { evtx, io } = this;
    io.use(cookieParser);
    io.use(getToken());
    io.on('connection', (socket) => {
      socket.on('action', (message) => {
        logger(`receive ${message.type} action`);
        const localCtx = { io, socket };
        evtx.run(message, localCtx)
          .then((res) => {
            socket.emit('action', res);
            logger(`sent ${res.type} action`);
          })
          .catch((err) => {
            const res = { status: err.status };
            socket.emit('action', { type: 'EvtX:Error', ...res });
          });
      });
    });
  }
}

const init = (evtx, io, config) => Promise.resolve(new Reactor(evtx, io, config));

export default init;
