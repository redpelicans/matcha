// /* global before, it, describe */
// /* eslint func-names: 0 */
// import R from 'ramda';
// import should from 'should';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';
// import socketIOClient from 'socket.io-client';
// import run from '../../run';
// import config from '../../../../config';
// import addFakeAccounts from '../../postgres/addFakeAccounts';
//
// describe.only('SocketIo', () => {
//   before(function () {
//     return run(config)
//       .then((ctx) => {
//         const { users } = ctx.models;
//         return users.deleteAll().then(() => ctx);
//       })
//       .then(addFakeAccounts)
//       .then((ctx) => {
//         const { http: { url } } = ctx;
//         this.ctx = ctx;
//         this.userId = 0;
//         this.url = url;
//         this.matchaToken = '';
//       });
//   });
//
//   it('should ping', function (done) {
//     const data = 'pong';
//     const message = {
//       type: 'status:ping',
//       payload: { data },
//       replyTo: 'pong',
//     };
//     const io = socketIOClient.connect(this.url);
//     io.emit('action', message);
//     io.on('action', res => {
//       should(res.type).eql('pong');
//       should(res.payload).eql({ ping: 'pong' });
//       done();
//     });
//   });
//
//   it('should print status', function (done) {
//     const message = {
//       type: 'status:get',
//       payload: {},
//       replyTo: 'get',
//     };
//     const io = socketIOClient.connect(this.url);
//     io.emit('action', message);
//     io.on('action', ({ payload: { postgres: { ping } } }) => {
//       should(ping).eql('pong');
//       done();
//     });
//   });
//
//   it('should add an user', function (done) {
//     const user = {
//       login: 'abarriel',
//       email: 'allan.barrielle@gmail.com',
//       password: 'password!1',
//       firstname: 'allan',
//       lastname: 'barrielle',
//       sexe: 'men',
//       age: '21',
//     };
//     const message = {
//       type: 'users:post',
//       payload: user,
//       replyTo: 'post',
//     };
//     const io = socketIOClient.connect(this.url);
//     io.emit('action', message);
//     io.on('action', res => {
//       const { payload } = res;
//       should(payload).type('object');
//       should(payload.id).type('number');
//       should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], payload)).eql(R.omit(['password'], user));
//       this.userId = payload.id;
//       done();
//     });
//   });
//
//   it('should confirm email user', function (done) {
//     const { secretSentence, expiresIn, routes: { confirmEmail } } = config;
//     const matchaToken = jwt.sign({ sub: this.userId }, secretSentence, { expiresIn });
//     this.matchaToken = matchaToken;
//     const url = `${this.ctx.http.url}/${confirmEmail}`;
//     axios({ method: 'get', url, params: { matchaToken } })
//     .then(({ data: user }) => {
//       should(user.confirmed).eql(true);
//       done();
//     })
//     .catch(done);
//   });
//
//   it('should update user', function (done) {
//     const infoToUpdate = {
//       email: 'barrielle@gmail.com',
//     };
//     const message = {
//       type: 'users:put',
//       payload: infoToUpdate,
//       matchaToken: this.matchaToken,
//       replyTo: 'put',
//     };
//     const io = socketIOClient.connect(this.url);
//     io.emit('action', message);
//     io.on('action', (res) => {
//       const { payload } = res;
//       should(payload.email).eql('barrielle@gmail.com');
//       done();
//     });
//   });
//   //
//   // it('should load user', function (done) {
//   //   const message = {
//   //     type: 'users:get',
//   //     payload: {},
//   //     matchaToken: this.matchaToken,
//   //     replyTo: 'get',
//   //   };
//   //   const io = socketIOClient.connect(this.url);
//   //   io.emit('action', message);
//   //   io.on('action', (res) => {
//   //     const { payload } = res;
//   //     should(payload.id).eql(this.userId);
//   //     done();
//   //   });
//   // });
// });
