/* global before, it, describe */
/* eslint func-names: 0 */
import should from 'should';
import jwt from 'jsonwebtoken';
import R from 'ramda';
import config from '../../../../config/server';
import init from '..';

const users = {
  name: 'users',

  add(user) {
    return Promise.resolve({ ...user, id: 1, confirmed: false });
  },
  load(id) {
    return Promise.resolve({ id });
  },
  update(data, id) {
    return Promise.resolve({ ...data, id, confirmed: true });
  },
  delete(id) {
    return Promise.resolve({ id });
  },
};

describe('service:users', () => {
  before(function () {
    const globals = { models: { users }, config };
    return init(globals).then(({ services: { evtx } }) => {
      this.evtx = evtx;
      this.userId = 0;
      this.matchaToken = '';
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
    const params = { service: 'users', method: 'post', input: user };
    this.evtx.run(params).then((newUser) => {
      this.userId = newUser.id;
      should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], newUser)).eql(R.omit(['password', 'latitude', 'longitude'], user));
      done();
    }).catch(done);
  });
});
