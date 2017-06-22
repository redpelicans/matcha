import axios from 'axios';
import should from 'should';
import initPostgres from '../postgres';
import config from '../../../config';
import run from '../run';
import jwt from 'jsonwebtoken';
import R from 'ramda';

describe('http:ping', function () {
  before(function () {
    return run(config)
      .then((context) => {
        const { users } = context.models;
        return users.deleteAll().then(() => context);
      })
      .then((context) => {
        this.context = context;
      })
  })

  it('should print status', function (done) {
    const url = `${this.context.http.url}/api/status`;
    axios({ method: 'get', url })
    .then(({data}) => {
      should(data).type('object');
      done();
    })
    .catch(done);
  })

  it('should not ping', function (done) {
    const url = `${this.context.http.url}/notroute`;
    axios({ method: 'get', url })
      .catch((err) => {
        const status = err.response.status;
        should(status).eql(404);
        done();
      });
  })

  it('should get register', function (done) {
    const url = `${this.context.http.url}/api/users`;
    const user = {
      login: 'abarriel',
      email: 'allan.barrielle@gmail.com',
      password: 'password!1',
      firstname: 'allan',
      lastname: 'barrielle',
    };
    axios({ method: 'post', url, data: user})
    .then(({data: newUser}) => {
      should(newUser.id).be.a.Number;
      should(R.omit(['id', 'confirmed', 'password'], newUser)).eql(R.omit(['password'], user));
      this.context.userId = newUser.id;
      done();
    })
    .catch(done);
  })

  it('should confirmEmail user', function (done) {
    const { secretSentence,  expiresIn  } = config;
    const { userId: id } = this.context;
    const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
    const url = `${this.context.http.url}/api/confirm_email`;
      axios({ method: 'get', url, params: {
        matchaToken: token
      } })
      .then(({data: user}) => {
        should(user.confirmed).eql(true);
        done();
      })
      .catch(done);
  })

  it('should log user', function (done) {
    const url = `${this.context.http.url}/login`;
    const user = { login: 'abarriel', password: 'password!1' };
      axios({ method: 'put', url, data: user })
      .then(({ headers }) => {
        const [,token] = /^matchaToken=(.+?);/.exec(headers['set-cookie'][0]);
        this.context.token = token;
        should(token).type('string');
        done();
      }).catch(done);
  })

  it('should update user', function (done){
    const url = `${this.context.http.url}/api/users`;
    const infoToUpdate = { email: 'barrielle@gmail.com' };
    const { token } = this.context;
    axios({ headers: { 'Cookie': `matchaToken=${token}` }, withCredentials: true, method: 'put', url, data: infoToUpdate })
      .then(({data: user}) => {
        should(user.email).eql('barrielle@gmail.com');
        done();
    }).catch(done);
  })

  it('should load user', function (done){
    const url = `${this.context.http.url}/api/users`;
    const { token } = this.context;
    axios({ headers: { 'Cookie': `matchaToken=${token}` }, withCredentials: true, method: 'get', url })
    .then(({ data: user }) => {
      should(user.id).eql(1);
      done();
    })
    .catch(done);
  })

  it('should delete user', function (done){
    const { token } = this.context;
    const url = `${this.context.http.url}/api/users`;
    axios({ headers: { 'Cookie': `matchaToken=${token}` }, withCredentials: true, method: 'delete', url })
      .then(({ data: user }) => {
        should(user.login).eql('abarriel');
        done();
      })
      .catch(done);
  })

  it('should not load user', function (done){
    const url = `${this.context.http.url}/api/users`;
    axios({method: 'get', url })
    .then(({ data: user }) => {
      should(user.error).type('string');
      done();
    })
    .catch(done);
  })
});
