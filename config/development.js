const server = { host: '127.0.0.1', port: 3004 };
const path = require('path');

module.exports = {
  secret: {
    path: path.join(__dirname, '../etc/secret.js'),
  },
  server,
  postgres: {
    host: 'rp3.redpelicans.com',
    port: 5432,
    database: 'matcha',
    user: 'postgres',
  },
};
