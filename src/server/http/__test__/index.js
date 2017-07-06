/* global before, it, describe */
/* eslint func-names: 0 */
import axios from 'axios';
import should from 'should';
import initHttp from '..';
import config from '../../../../config/server';

describe('http:ping', () => {
  before(function () {
    return initHttp({ config, services: { evtx: {} }, models: { users: {} } })
      .then((ctx) => {
        this.ctx = ctx;
      });
  });

  it('should ping', function (done) {
    const url = `${this.ctx.http.url}/ping`;
    axios({ method: 'get', url })
      .then(({ data }) => {
        should(data.ping).eql('pong');
        done();
      })
      .catch(done);
  });

  it('should not ping', function (done) {
    const url = `${this.ctx.http.url}/notroute`;
    axios({ method: 'get', url })
      .catch((err) => {
        const status = err.response.status;
        should(status).eql(404);
        done();
      });
  });
});
