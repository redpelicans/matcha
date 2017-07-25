console.log(`running in ${process.env.NODE_ENV} mode.`); // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configure-store-prod'); // eslint-disable-line
} else {
  module.exports = require('./configure-store-dev'); // eslint-disable-line
}
