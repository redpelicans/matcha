import debug from 'debug';
import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan-debug';
import errors from './middlewares/errors';

const loginfo = debug('matcha:http');

const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const init = (ctx) => {
  const app = express();
  const { server: { host, port } } = ctx.config;
  const promise = new Promise(resolve => {
    const httpServer = http.createServer(app);
    app
      .use(compression())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .use(logger('matcha:http', 'dev'))
      .use(errors());
    httpServer.listen(port, host, () => {
      httpServer.url = getUrl(httpServer);
      loginfo(`Connected ${httpServer.url}`);
      resolve({ ...ctx, http: httpServer });
    });
  });
  return promise;
};

export default init;
