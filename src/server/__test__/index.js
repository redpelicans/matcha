/* global before, it, describe */
/* eslint func-names: 0 */
import R from 'ramda';
import should from 'should';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import run from '../run';
import config from '../../../config';
import addFakeAccounts from '../postgres/__test__/addFakeAccounts';

describe('functional', () => {
  before(function () {
    return run(config)
      .then((ctx) => {
        const { users } = ctx.models;
        return users.deleteAll().then(() => ctx);
      })
      .then(addFakeAccounts)
      .then((ctx) => {
        const { http: { url } } = ctx;
        this.ctx = ctx;
        this.allanId = 0;
        this.kylieId = 0;
        this.url = url;
        this.matchaToken = '';
        this.allanToken = '';
        this.kylieToken = '';
      });
  });

  it('should ping', function (done) {
    const data = 'pong';
    const message = {
      type: 'admin:ping',
      payload: { data },
      replyTo: 'pong',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', res => {
      should(res.type).eql('pong');
      should(res.payload).eql({ ping: 'pong' });
      done();
    });
  });

  it('should print status admin', function (done) {
    const message = {
      type: 'admin:status',
      payload: {},
      replyTo: 'get',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload: { postgres: { ping } } }) => {
      should(ping).eql('pong');
      done();
    });
  });

  it('should add an user', function (done) {
    const user = {
      login: 'abarriel',
      email: 'allan.barrielle@gmail.com',
      password: 'password!1',
      firstname: 'allan',
      lastname: 'barrielle',
      sexe: 'men',
      age: '21',
    };
    const message = {
      type: 'users:post',
      payload: user,
      replyTo: 'post',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', res => {
      const { payload } = res;
      should(payload).type('object');
      should(payload.id).type('number');
      should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], payload)).eql(R.omit(['password'], user));
      this.allanId = payload.id;
      done();
    });
  });

  it('should confirm email user', function (done) {
    const { secretSentence, expiresIn, routes: { confirmEmail } } = config;
    const matchaToken = jwt.sign({ sub: this.allanId }, secretSentence, { expiresIn });
    this.matchaToken = matchaToken;
    const url = `${this.ctx.http.url}/${confirmEmail}`;
    axios({ method: 'get', url, params: { matchaToken } })
    .then(({ data: user }) => {
      should(user.confirmed).eql(true);
      done();
    })
    .catch(done);
  });

  it('should update user', function (done) {
    const infoToUpdate = {
      email: 'barrielle@gmail.com',
    };
    const message = {
      type: 'users:put',
      payload: infoToUpdate,
      matchaToken: this.matchaToken,
      replyTo: 'put',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload }) => {
      should(payload.email).eql('barrielle@gmail.com');
      done();
    });
  });

  it('should add an other user', function (done) {
    const user = {
      login: 'kjenner',
      email: 'kjenner@gmail.com',
      password: 'password!1',
      firstname: 'kylie',
      lastname: 'jenner',
      sexe: 'women',
      age: '21',
    };
    const message = {
      type: 'users:post',
      payload: user,
      replyTo: 'post',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', res => {
      const { payload } = res;
      should(payload).type('object');
      should(payload.id).type('number');
      should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], payload)).eql(R.omit(['password'], user));
      this.kylieId = payload.id;
      done();
    });
  });

  it('should confirm email of the second user', function (done) {
    const { secretSentence, expiresIn, routes: { confirmEmail } } = config;
    const matchaToken = jwt.sign({ sub: this.kylieId }, secretSentence, { expiresIn });
    this.matchaToken = matchaToken;
    const url = `${this.ctx.http.url}/${confirmEmail}`;
    axios({ method: 'get', url, params: { matchaToken } })
    .then(({ data: user }) => {
      should(user.confirmed).eql(true);
      done();
    })
    .catch(done);
  });

  it('should log abarriel in', function (done) {
    const data = {
      login: 'abarriel',
      password: 'password!1',
    };
    const message = {
      type: 'users:login',
      payload: data,
      replyTo: 'put',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload }) => {
      this.allanToken = payload;
      should(payload).type('string');
      done();
    });
  });

  it('should log kjenner in', function (done) {
    const data = {
      login: 'kjenner',
      password: 'password!1',
    };
    const message = {
      type: 'users:login',
      payload: data,
      replyTo: 'put',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload }) => {
      this.kylieToken = payload;
      should(payload).type('string');
      done();
    });
  });
// LIKES

  it('should add likes', function (done) {
    const data = {
      from: this.allanId,
      to: this.kylieId,
    };
    const message = {
      type: 'likes:addLike',
      payload: data,
      matchaToken: this.allanToken,
      replyTo: 'pong',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload }) => {
      should(Number(payload.to_user)).eql(this.kylieId);
      should(Number(payload.from_user)).eql(this.allanId);
      done();
    });
  });

  it('should remove likes', function (done) {
    const data = {
      from: this.allanId,
      to: this.kylieId,
    };
    const message = {
      type: 'likes:unLike',
      payload: data,
      matchaToken: this.allanToken,
      replyTo: 'pong',
    };
    const io = socketIOClient.connect(this.url);
    io.emit('action', message);
    io.on('action', ({ payload }) => {
      should(Number(payload.to_user)).eql(this.kylieId);
      should(Number(payload.from_user)).eql(this.allanId);
      done();
    });
  });
});
