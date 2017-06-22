import express from 'express';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import sendTokenResetPassword from './sendTokenResetPassword';
import errors from './middlewares/errors';
import checkToken from './middlewares/checkToken';
import getToken from './middlewares/getToken';
import resetPassword from './resetPassword';
import login from './login';
import connectEvtx from './connector';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = (ctx) => {
  const app = express();
  const { services: { evtx } } = ctx;
  const { server: { host, port } } = ctx.config;
  const promise = new Promise(resolve => {
    const httpServer = http.createServer(app);
    app
      .use(compression())
      .use(cookieParser())
      .use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
      .use(logger('matcha:http', 'dev'))
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .put('/login', login(ctx))
      .get('/lost_password', sendTokenResetPassword(ctx))
      .post('/reset_password', checkToken, resetPassword)
      .use('/api', getToken, connectEvtx(evtx))
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
