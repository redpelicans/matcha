import debug from 'debug';

const logger = debug('matcha:socketio');

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

class Reactor {
  constructor(evtx, io) {
    this.io = io;
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
    const { evtx, io } = this;
    // .use
    // cookie parse
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

const init = (evtx, io) => Promise.resolve(new Reactor(evtx, io));

export default init;
