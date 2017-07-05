/* global before, it, describe */
/* eslint func-names: 0 */
/* eslint prefer-arrow-callback:0 */
import should from 'should';
import R from 'ramda';
import config from '../../../../config';
import users from '../../models/users';
import initPostgres from '..';
import loadUserSchema from '../loadUserSchema';
// import loadEventSchema from '../loadEventSchema';

describe('models:users:method', () => {
  before(function () {
    return initPostgres({ config, startTime: new Date() })
    .then(loadUserSchema)
    // .then(loadEventSchema)
    .then((ctx) => users.deleteAll().then(() => ctx))
    .then(ctx => {
      this.ctx = ctx;
      this.userId = 0;
      return ctx;
    });
  });

  it('should insert a user in users', function (done) {
    const data = {
      login: 'abarriel',
      email: 'allan.barrielle@gmail.com',
      password: 'password!1',
      firstname: 'allan',
      lastname: 'barrielle',
      sexe: 'men',
      age: '21',
    };
    users.add(data).then(user => {
      should(user).type('object');
      should(user.id).type('number');
      should(R.pick(['login', 'email', 'firstname', 'lastname', 'sexe', 'age'], user)).eql(R.omit(['password'], data));
      this.userId = user.id;
      done();
    }).catch(done);
  });

  it('should load a user from users', function (done) {
    users.load(this.userId).then(user => {
      should(user.login).eql('abarriel');
      done();
    }).catch(done);
  });

  it('should load all info user from users with getByEmail', function (done) {
    const data = 'abarriel';
    users.getByEmail(data).then(user => {
      should(user.login).eql(data);
      done();
    }).catch(done);
  });

  it('should update user from users ', function (done) {
    const data = { login: '123', password: 'hello' };
    users.update(data, this.userId).then(user => {
      should(user.login).eql(data.login);
      done();
    }).catch(done);
  });

  it('should not update id at any time - error', function (done) {
    const data = { id: this.userId, val: 123, msg: 'hello' };
    users.update(data, 1).catch((resp) => {
      should(resp).type('object');
      done();
    });
  });

  it('should delete user from users ', function (done) {
    users.delete(this.userId).then((resp) => {
      should(resp).type('object');
      done();
    }).catch(done);
  });
});
