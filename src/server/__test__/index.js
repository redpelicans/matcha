/* global before, it, describe */
/* eslint func-names: 0 */
import axios from 'axios';
import should from 'should';
import jwt from 'jsonwebtoken';
import cookie from 'cookie'; //eslint-disable-line
import R from 'ramda';
import config from '../../../config';
import run from '../run';
import addFakeAccounts from '../postgres/addFakeAccounts';

describe('functional:test', () => {
  before(function () {
    return run(config)
      .then((ctx) => {
        const { users } = ctx.models;
        return users.deleteAll().then(() => ctx);
      })
      .then(addFakeAccounts)
      .then((ctx) => {
        this.ctx = ctx;
        this.userId = 0;
        this.matchaToken = '';
      });
  });

  it('should print status', function (done) {
    const url = `${this.ctx.http.url}/api/status`;
    axios({ method: 'get', url })
    .then(({ data: { postgres: { ping } } }) => {
      should(ping).eql('pong');
      done();
    })
    .catch(done);
  });

  it('should add an user', function (done) {
    const url = `${this.ctx.http.url}/api/users`;
    const user = {
      login: 'abarriel',
      email: 'allan.barrielle@gmail.com',
      password: 'password!1',
      firstname: 'allan',
      lastname: 'barrielle',
      sexe: 'men',
      age: '21',
    };
    axios({ method: 'post', url, data: user })
    .then(({ data: newUser }) => {
      should(newUser.id).type('number');
      should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], newUser)).eql(R.omit(['password'], user));
      this.userId = newUser.id;
      done();
    })
    .catch(done);
  });

  it('should confirm email user', function (done) {
    const { secretSentence, expiresIn, routes: { confirmEmail } } = config;
    const matchaToken = jwt.sign({ sub: this.userId }, secretSentence, { expiresIn });
    const url = `${this.ctx.http.url}/${confirmEmail}`;
    axios({ method: 'get', url, params: { matchaToken } })
    .then(({ data: user }) => {
      should(user.confirmed).eql(true);
      done();
    })
    .catch(done);
  });

  it('should log user in ', function (done) {
    const url = `${this.ctx.http.url}/login`;
    const user = { login: 'abarriel', password: 'password!1' };
    axios({ method: 'put', url, data: user })
    .then(({ headers }) => {
      const { matchaToken } = cookie.parse(headers['set-cookie'][0]);
      this.matchaToken = cookie.serialize('matchaToken', matchaToken);
      should(matchaToken).type('string');
      done();
    }).catch(done);
  });

  it('should update user', function (done) {
    const url = `${this.ctx.http.url}/api/users`;
    const infoToUpdate = { email: 'barrielle@gmail.com' };
    axios({ headers: { Cookie: this.matchaToken }, withCredentials: true, method: 'put', url, data: infoToUpdate })
    .then(({ data: user }) => {
      should(user.email).eql('barrielle@gmail.com');
      done();
    }).catch(done);
  });

  it('should load user', function (done) {
    const url = `${this.ctx.http.url}/api/users`;
    axios({ headers: { Cookie: this.matchaToken }, withCredentials: true, method: 'get', url })
    .then(({ data: user }) => {
      should(user.id).type('number');
      done();
    })
    .catch(done);
  });
  it('should suggestion user', function (done) {
    const url = `${this.ctx.http.url}/api/users?suggestion=yes`;
    axios({ headers: { Cookie: this.matchaToken }, withCredentials: true, method: 'get', url })
    .then(({ data: user }) => {
      // should(user.id).eql(1);
      done();
    })
    .catch(done);
  });

  // it('should delete user', function (done) {
  //   const url = `${this.ctx.http.url}/api/users`;
  //   axios({ headers: { Cookie: this.matchaToken }, withCredentials: true, method: 'delete', url })
  //     .then(({ data: user }) => {
  //       should(user.login).eql('abarriel');
  //       done();
  //     })
  //     .catch(done);
  // });
  //
  // it('should not load user', function (done) {
  //   const url = `${this.ctx.http.url}/api/users`;
  //   axios({ method: 'get', url })
  //   .then(done)
  //   .catch(() => { done(); });
  // });
});
