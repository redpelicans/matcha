import axios from 'axios';
import should from 'should';
import initHttp from '..';
import config from '../../../../config';
import initServices from '../../services';

describe('http:ping', function () {
  before(function () {
    return initServices({ config })
      .then(initHttp)
      .then((context) => {
          this.context = context;
      })
  })
  it('should ping', function (done) {
    const url = `${this.context.http.url}/ping`;
    axios({ method: 'get', url })
      .then(({ data }) => {
        should(data.ping).eql('pong');
        done();
      })
      .catch(done);
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
  // it('should get register', function (done) {
  //   const url = `${this.context.http.url}/api/user`;
  //   axios({ method: 'post', url, data: {
  //     login: 'aabarriel',
  //     email: 'aallan.barrielle@gmail.com',
  //     password: 'password!1',
  //     firstname: 'allan',
  //     lastname: 'barrielle',
  //   }})
  //     .then(({data}) => {
  //       console.log(data);
  //     })
  //     .catch(console.log);
  // })
});
