/* global before, it, describe */
/* eslint func-names: 0 */
import should from 'should';
import socketIOClient from 'socket.io-client';
import initEvtx from '../../services';
import initHttp from '../../http';
import initSocketIo from '..';
import config from '../../../../config';

describe.only('SocketIo', () => {
  before(function () {
    const globals = { models: { users: {} }, config };
    return initEvtx(globals)
        .then(initHttp)
        .then(initSocketIo)
        .then((ctx) => {
          this.ctx = ctx;
        });
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
    io.on('action', (res) => {
      should(res.type).eql('pong');
      should(res.payload).eql({ ping: 'pong' });
      done();
    });
    io.emit('action', message);
  });
});
