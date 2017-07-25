import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import sendTokenResetPassword from './sendTokenResetPassword';
import { errors, checkToken, getToken, getUser, checkAuth } from './middlewares';
import resetPassword from './resetPassword';
import confirmEmail from './confirmEmail';
import addImg from './addImg';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const upload = multer({
  dest: path.join(__dirname, '../../../public/uploads/'),
  limits: {
    fileSize: 2000000,
    files: 5,
  },
});

const init = (ctx) => {
  const app = express();
  const { server: { host, port }, secretSentence } = ctx.config;
  const { models: { users } } = ctx;
  const promise = new Promise(resolve => {
    const httpServer = http.createServer(app);
    app
      .use(cors())
      .use(compression())
       .post('/add_img',
        upload.fields([{ name: 'imgs', maxCount: 4 }, { name: 'imgProfile', maxCount: 1 }]),
        getToken(), checkAuth(secretSentence), addImg(users))
      .use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .use(logger('matcha:http', 'dev'))
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .get('/confirm_email', getToken(), getUser(ctx.config), confirmEmail())
      .get('/lost_password', sendTokenResetPassword(ctx))
      .post('/reset_password', getToken(), checkToken, resetPassword)
      .use(errors());

    httpServer.listen(port, host, () => {
      httpServer.url = getUrl(httpServer);
      console.log(`Connected ${httpServer.url}`); // eslint-disable-line no-console
      resolve({ ...ctx, http: httpServer });
    });
  });
  return promise;
};

export default init;
