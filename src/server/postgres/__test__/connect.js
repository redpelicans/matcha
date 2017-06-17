import config from '../../../../config';
import initPostgres from '..';
import users from '../../models/users';
import should from 'should';
import loadSchema from '../loadSchema';

describe('models:users:method', function(){
  before(function(){
    return initPostgres({ config, startTime: new Date()})
    .then(loadSchema)
    .then(ctx => {
      this.ctx = ctx;
      return ctx;
    });
  })

  it('should insert a user in users', function(done){
    const user = { login: 'test1', email: 'mailtest', password: 'passwd1'};
    users.add(user).then((res) => {
      should(res.id).type('number');
      done();
    }).catch(done);
  })

  it('should load a user from users', function(done){
    const data = { id: 1, show: [ 'login','email' ] };
    users.load(data).then((resp) => {
      should(resp).type('object');
      done();
      }).catch(done);
  })

  it('should not print any password from users - Error', function(done){
    const data = { id: 1, show: [ 'login','email','password' ] };
    users.load(data).then(done).catch((resp) => {
      should(resp).type('object');
      done();
    });
  })
  it('should update data from users', function(done){
    // const data = { id: 1, show: [ 'login','email','password' ] };
    // users.load(data).then(done).catch((resp) => {
      // should(resp).type('object');
      // done();
    // });
  })

//   // start stock in srv
//   // /status => http, ping sur db and res = success, with all params without passwd
//   // /ping pour http
//   // dont use pool for test
//   // test ouf
//   // supprier addfake account handle error
//   // keet reset_Data;
//   // recup cookie / if not cookie  throw err
});
