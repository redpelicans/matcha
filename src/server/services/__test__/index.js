import should from 'should';
import EvtX from 'evtx';
import jwt from 'jsonwebtoken';
import R from 'ramda';
import initPostgres from '../../postgres';
import config from '../../../../config';

const users = {
   add(user) {
     return Promise.resolve({ ...user,id: 1, confirmed: false });
  },
};

describe('service:users', function(){
  before(function(){
      const ctx = { config: config };
      const { secretSentence, expiresIn } = config;
      const token = jwt.sign({ sub: 1 }, secretSentence, { expiresIn });
      ctx.matchaToken = token;
      this.ctx = ctx;
      return ctx;
  })
  it('should add an user', function(done){
    const { matchaToken } = this.ctx;
    const user = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'password!1', firstname: 'allan', lastname: 'barrielle' };
    const evtx = EvtX(this.ctx);
    const params = { service: 'users', method: 'post', input: user };
    evtx.run(params, { req: { token: matchaToken } }).then((newUser) => {
      console.log('newUser');
      // should(newUser.id).be.a.Number;
      // should(R.omit(['id', 'confirmed'], newUser)).eql(user);
      // done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  })
});
