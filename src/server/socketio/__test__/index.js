/* global before, it, describe */
/* eslint func-names: 0 */
import should from 'should';
import socketIOClient from 'socket.io-client';
// import initEvtx from '../../services';
// import initHttp from '../../http';
// import initSocketIo from '..';
import run from '../../run';
import config from '../../../../config';
import addFakeAccounts from '../../postgres/addFakeAccounts';

describe.only('SocketIo', () => {
  before(function () {
    // const globals = { models: { users: {} }, config };
    return run(config)
      // .then((ctx) => {
      //   const { users } = ctx.models;
      //   return users.deleteAll().then(() => ctx);
      // })
      // .then(addFakeAccounts)
      .then((ctx) => {
        this.ctx = ctx;
        // this.userId = 0;
        // this.matchaToken = '';
      });
    // return initEvtx(globals)
    //     .then(initHttp)
    //     .then(initSocketIo)
    //     .then((ctx) => {
    //       this.ctx = ctx;
    //     });
  });

  it('should ping', function (done) {
    const data = 'pong';
    const message = {
      type: 'admin:ping',
      payload: { data },
      replyTo: 'pong',
    };
    const { http: { url } } = this.ctx;
    const io = socketIOClient.connect(url);
    io.emit('action', message);
    io.on('action', (res, err) => {
      console.log(res);
      console.log(err);
      should(res.type).eql('pong');
      should(res.payload).eql({ ping: 'pong' });
      done();
    })
    // io.on('error', (err) => {
    //   console.log(err);
    //   // done();
    // })
  });
});
