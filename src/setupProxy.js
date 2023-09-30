import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/files',
    createProxyMiddleware({
      target: 'https://sayapp.company',
      changeOrigin: true,
    })
  );
};
