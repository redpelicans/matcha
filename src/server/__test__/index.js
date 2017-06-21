import axios from 'axios';
import should from 'should';
import config from '../../../config';
import { run } from '..';

describe('http:ping', function () {
    this.timeout(25000);
  before(function () {
    return run(config)
      .then((context) => {
        this.context = context;
        console.log(context.models.users.db);
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
    axios({ method: 'post', url, data: {
      login: 'aabarriel',
      email: 'aallan.barrielle@gmail.com',
      password: 'password!1',
      firstname: 'allan',
      lastname: 'barrielle',
    }})
    .then(({data}) => {
      console.log(data);
      // should(data).type('object');
      // done();
    })
      // .then(({data})) => {
      //   console.log('usefeirsohfeorifheorhfeiorhferfer5468465468468468468468468r');
      //   console.log(data);
      //   should(newUser.id).be.a.Number;
      //  should(R.omit(['id', 'confirmed'], newUser)).eql(user);
      //  done();
      // })
      .catch((err) => console.log('err'));
  })
});
