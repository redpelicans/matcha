import { Router } from 'express';
import userInfo from './userInfo';
import register from './register';
import loadInfos from './loadInfos';

const user = Router();

user
  .use((req, res, next) => { console.log('/user'); next(); })
  .get('/:id', userInfo)
  .post('/', register)
  .get(loadInfos);

export default user;
