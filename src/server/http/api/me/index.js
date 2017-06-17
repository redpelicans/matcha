import { Router } from 'express';
import myAccount from './myAccount';
import updateAccount from './updateAccount';
import deleteAccount from './deleteAccount';

const me = Router();

me
  .use((req, res) => res.send('me'))
  .get(myAccount)
  .put(updateAccount)
  .delete(deleteAccount);

export default me;
