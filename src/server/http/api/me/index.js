import { Router } from 'express';
import myAccount from './myAccount';
import updateAccount from './updateAccount';
import deleteAccount from './deleteAccount';
import resetPassword from './resetPassword';
import getToken from '../../middlewares/getToken';
import checkToken from '../../middlewares/checkToken';
import generateOneTimeToken from '../../middlewares/generateOneTimeToken';
import verify from './verify';

const me = Router();

me
  .get('/', myAccount)
  .put('/', updateAccount)
  .get('/verify', verify)
  .get('/lost_password', generateOneTimeToken) // will change to reset_password when the front will be set up
  .post('/reset_password', getToken, checkToken, resetPassword)
  .delete('/', deleteAccount);

export default me;
