const server = { host: '127.0.0.1', port: 3005 };
const serverUrl = `http://${server.host}:${server.port}`;
module.exports = {
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  server,
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '127.0.0.1',
    port: 3001,
    proxy: {
      '/api': {
        target: serverUrl,
        secure: false,
      }
    },
  },
}
