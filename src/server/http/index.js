import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import sendTokenResetPassword from './sendTokenResetPassword';
import { errors, checkToken, getToken, getUser } from './middlewares';
import resetPassword from './resetPassword';
import confirmEmail from './confirmEmail';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = (ctx) => {
  const app = express();
  const { server: { host, port } } = ctx.config;
  const promise = new Promise(resolve => {
    const httpServer = http.createServer(app);
    app
      .use(compression())
      .use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .use(logger('matcha:http', 'dev'))
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .get('/confirm_email', getToken(), getUser(ctx.config), confirmEmail())
      .get('/lost_password', sendTokenResetPassword(ctx))
      .post('/reset_password', checkToken, resetPassword)
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
