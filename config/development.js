const server = { host: '127.0.0.1', port: 3004 };
const path = require('path');

module.exports = {
  secret: {
    path: path.join(__dirname, '../etc/secret.js'),
  },
  httpCode: {
    BadRequest: 200,  //  400
    Unauthorized: 201, // 401
    Forbidden: 203,    // 403
    Error: 204,       //  404
  },
  expiresIn: '10h',
  server,
  postgres: {
    host: 'rp3.redpelicans.com',
    port: 5432,
    database: 'matcha',
    user: 'postgres',
  },
};
