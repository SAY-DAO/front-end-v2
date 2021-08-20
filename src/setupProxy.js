const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/files',
    createProxyMiddleware({
      target: 'https://sayapp.company',
      changeOrigin: true,
    })
  );
};
