const server = { host: '127.0.0.1', port: 3004 };
const path = require('path');

module.exports = {
  secret: {
    path: path.join(__dirname, '../../etc/secret.js'),
  },
  statusCode: {
    WrongToken: 1000, // 401
    Unauthorized: 1001, // 401
    BadRequest: 1002,  //  400
    Forbidden: 1003,    // 403
    error: 1004,       //  404
  },
  expiresIn: '10h',
  server,
  postgres: {
    host: 'rp3.redpelicans.com',
    port: 5432,
    database: 'matcha',
    user: 'postgres',
  },
  configPgp: {
  },
  routes: {
    confirmEmail: '/confirm_email',
    resetPassword: '/reset_password',
  },
};
