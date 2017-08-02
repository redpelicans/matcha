import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import multer from 'koa-multer';
import Router from 'koa-router';
import path from 'path';
import cors from 'kcors';
import { checkToken, getToken, getUser, checkAuth } from './middlewares';
import addImg from './addImg';
import sendTokenResetPassword from './sendTokenResetPassword';
import confirmEmail from './confirmEmail';
import resetPassword from './resetPassword';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = ctx => new Promise(resolve => {
  const app = new Koa();
  const router = new Router();
  const { server: { host, port }, secretSentence } = ctx.config;
  const { models: { users } } = ctx;
  const upload = multer({
    dest: path.join(__dirname, '../../../public/uploads/'),
    limits: {
      fileSize: 2000000,
      files: 5,
    },
  });

  router
    .get('/ping', ctx => ctx.body = ({ ping: 'pong' })) // eslint-disable-line
    .get('/auth', getToken, checkAuth(secretSentence), cntx => cntx.status = 200) // eslint-disable-line
    .get('/confirm_email', getToken, getUser(ctx.config), confirmEmail(users))
    .get('/lost_password', sendTokenResetPassword(ctx))
    .post('/reset_password', getToken, checkToken, resetPassword)
    .post('/add_img',
      upload.fields([{ name: 'imgs', maxCount: 4 }, { name: 'imgProfile', maxCount: 1 }]),
      getToken, checkAuth(secretSentence), addImg(users));

  app
    .use(bodyParser())
    .use(logger())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
  const httpServer = app.listen(port, host, () => {
    httpServer.url = getUrl(httpServer);
    console.log(`Connected ${httpServer.url}`); // eslint-disable-line no-console
    resolve({ ...ctx, http: httpServer });
  });
});

export default init;
