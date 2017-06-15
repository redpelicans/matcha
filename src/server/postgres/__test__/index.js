import should from 'should';
import initPostgres from '..';
import config from '../../../../config';

describe('postgres:ping', function () {
  before(function () {
    return initPostgres({ config })
      .then((context) => {
        console.log("dd");
        this.context = context;
      })
  })
  it('should ping', function(done){
    const { db } = this.context;
    const res = db.query('SELECT 1')
    .then(res => {
      should(res).type('object');
      done();
    })
    .catch(error => console.error(error.stack))
  })
});
