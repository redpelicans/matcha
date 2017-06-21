// import axios from 'axios';
// import should from 'should';
// import initHttp from '..';
// import config from '../../../../config';
//
// describe('http:ping', function () {
//   before(function () {
//     return initHttp({ config })
//       .then((context) => {
//           this.context = context;
//       })
//   })
//   it('should ping', function (done) {
//     const url = `${this.context.http.url}/ping`;
//     axios({ method: 'get', url })
//       .then(({ data }) => {
//         should(data.ping).eql('pong');
//         done();
//       })
//       .catch(done);
//   })
//   it('should not ping', function (done) {
//     const url = `${this.context.http.url}/notroute`;
//     axios({ method: 'get', url })
//       .catch((err) => {
//         const status = err.response.status;
//         should(status).eql(404);
//         done();
//       });
//   })
// })
