import { Router } from 'express';
import userInfo from './userInfo';
import register from './register';
import loadInfos from './loadInfos';
import checkAuth from '../../middlewares/checkAuth';
// import myAccount from './myAccount';
import updateAccount from './updateAccount';
import deleteAccount from './deleteAccount';
import resetPassword from './resetPassword';
import checkToken from '../../middlewares/checkToken';
import generateOneTimeToken from '../../middlewares/generateOneTimeToken';
import verify from './verify';

const init = (config) => {
  const user = Router();
  user
  .post('/', register(config))
  .get('/lost_password', generateOneTimeToken) // will change to reset_password when the front will be set up
  .post('/reset_password', checkToken, resetPassword)
  .use(checkAuth(config))
  .get('/verify', verify)
  .get('/:id', userInfo)
  .get('/', loadInfos)
  .put('/', updateAccount)
  .delete('/', deleteAccount);
  // .use((req, res, next) => { console.log('/user'); next(); })
  return user;
};

export default init;
