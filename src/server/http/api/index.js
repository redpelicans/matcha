import { Router } from 'express';
import getToken from '../middlewares/getToken';
import initUser from './user';

const initApi = ({ config }) => {
  const api = Router();
  api
  .use(getToken)
  .use('/users', initUser(config));
  return api;
};


export default initApi;
