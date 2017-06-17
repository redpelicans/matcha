import express from 'express';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import errors from './middlewares/errors';
import login from './login';
import forgetPassword from './forgetPassword';
import api from './api';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = (ctx) => {
  const app = express();
  const { server: { host, port } } = ctx.config;
  const promise = new Promise(resolve => {
    const httpServer = http.createServer(app);
    app
      .use(compression())
      .use(cookieParser())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(logger('matcha:http', 'dev'))
      .use('/ping', (req, res) => res.json('pong'))
      .put('/login', login)
      .put('/forget_password', forgetPassword)
      .use('/api', api)
      .use(errors());

    httpServer.listen(port, host, () => {
      httpServer.url = getUrl(httpServer);
      console.log(`Connected ${httpServer.url}`); // eslint-disable-line no-console
      resolve({ ...ctx, http: httpServer });
    });
  });
  return promise;
};

// add jwt in cookie
// middeleware atuh
// route api/ users DONE

// statuts connect or not
// middleware password
// /api/users/1
// restufl

export default init;
