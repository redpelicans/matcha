import should from 'should';
import initPostgres from '..';
import config from '../../../../config';

describe('postgres:connection', function () {
  before(function () {
    return initPostgres({ config })
      .then((context) => {
        this.context = context;
      })
  })
  it('should be connected', function(done){
    const { db } = this.context;
    const res = db.query('SELECT 1')
    .then(res => {
      const { port, host } = db.client;
      console.log(`Connected at ${host} ${port}`);
      should(res).type('object');
      done();
    })
    .catch(error => console.error(error.stack))
  })
});
