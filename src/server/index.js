import debug from 'debug';
import config from '../../config';
import initHttp from './http';
import users from './models/users';
import loadSchema from './postgres/loadSchema';
import initPostgres from './postgres';

const logger = debug('matcha:server/index.js');

// add start tim

initPostgres({ config, startTime: new Date()})
  .then(loadSchema)
  .then(initHttp)
  .then(() => logger('Server started!'))
  .then(() => {
    // const data = { login: 'genre', email: 'allan.barrielle@gmail.com', password: 'password!1' };
    // // const info = { change: 'confirmed', set: 'true', id: 4 };
    // users.add(data);
    // // users.update(info);
    // users.print().then(console.log);
  })
  .catch(err => logger(err.stack));
