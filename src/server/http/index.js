import express from 'express';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import errors from './middlewares/errors';
import login from './login';
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
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .put('/login', login)
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

// statuts connect or not

export default init;
