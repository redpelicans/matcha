import { Router } from 'express';
import userInfo from './userInfo';
import register from './register';
import loadInfos from './loadInfos';

const user = Router();

user
  .get('/:id', userInfo)
  .post(register)
  .get(loadInfos);

export default user;
