// import config from '../../../../config';
// import initPostgres from '..';
// import users from '../../models/users';
// import should from 'should';
// import loadSchema from '../loadSchema';
//
// describe.only('models:users:method', function(){
//   before(function(){
//     return initPostgres({ config, startTime: new Date()})
//     .then(loadSchema)
//     .then(ctx => {
//       this.ctx = ctx;
//       return ctx;
//     });
//   })
//
//   it('should insert a user in users', function(done){
//     const user = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'passwd1', firstname: 'allan', lastname: 'barrielle' };
//     users.add(user).then((res) => {
//       should(res).type('object');
//       done();
//     }).catch(done);
//   })
//
//   it('should load a user from users', function(done){
//     users.load(1).then((resp) => {
//       should(resp).type('object');
//       done();
//       }).catch(done);
//   })
//
//   it('should load all info user from users except pass', function(done){
//       const data = 'allan.barrielle@gmail.com';
//       users.getByEmail(data).then((resp) => {
//         should(resp).type('object');
//         done();
//         }).catch(done);
//     })
//   it('should not print any password from users - Error', function(done){
//     const data = { id: 1, show: [ 'login','email','password' ] };
//     users.load(data).catch((resp) => {
//       should(resp).type('object');
//       done();
//     });
//   })
//   it('should update user from users ', function(done){
//     const data = { login: '123', password: 'hello' };
//     const id = 1;
//     users.update(data, id).then((resp) => {
//       should(resp).type('object');
//       done();
//       }).catch(done);
//   });
//
//    it('should not update id at any time - error', function(done){
//     const data = { id: 1, val: 123, msg: 'hello' };
//     users.update(data, 1).catch((resp) => {
//       should(resp).type('object');
//       done();
//     });
//   });
//
//   it('should delete user from users ', function(done){
//     users.delete(1).then((resp) => {
//       should(resp).type('object');
//       done();
//     }).catch(done);
//   });
//
// });
