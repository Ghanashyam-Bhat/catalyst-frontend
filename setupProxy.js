const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ' https://1500-117-198-99-29.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
