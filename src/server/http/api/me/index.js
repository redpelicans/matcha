import { Router } from 'express';
import myAccount from './myAccount';
import updateAccount from './updateAccount';
import deleteAccount from './deleteAccount';
import verify from './verify';

const me = Router();

me
  .get(myAccount)
  .get('/verify', verify)
  .put(updateAccount)
  .delete(deleteAccount);

export default me;
