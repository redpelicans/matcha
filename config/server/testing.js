const server = { host: '127.0.0.1' };
const path = require('path');

module.exports = {
  secret: {
    path: path.join(__dirname, '../../etc/secret.js'),
  },
  statusCode: {
    Unauthorized: 201, // 401
    BadRequest: 202,  //  400
    Forbidden: 203,    // 403
    error: 306,       //  404
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
    noWarnings: true,
  },
  routes: {
    confirmEmail: 'confirm_email',
    resetPassword: 'reset_password',
  },
};
