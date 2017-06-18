import { Router } from 'express';
import getToken from '../middlewares/getToken';
import checkAuth from '../middlewares/checkAuth';
import user from './user';
import me from './me';

const Api = Router();

Api
  .use(getToken)
  .use(checkAuth)
  .use((req, res, next) => { console.log('/api'); next(); })
  .use('/user', user)
  .use('/me', me);

export default Api;
