const path = require('path');
module.exports = {
  publicPath: path.join(__dirname, '../public'),
  buildPath: path.join(__dirname, '../build'),
  computer: {
    url: 'http://127.0.0.1:3005/api/computer/',
  },
};
