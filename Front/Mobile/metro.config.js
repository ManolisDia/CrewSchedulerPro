module.exports = {
    resolver: {
      assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'otf'],
      sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    },
    server: {
      port: 8081,
      enhanceMiddleware: (middleware, server) => {
        return (req, res, next) => {
          if (req.url.startsWith('/api')) {
            const apiUrl = new URL(req.url, 'http://192.168.0.25:8080');
            req.url = apiUrl.toString();
          }
          return middleware(req, res, next);
        };
      },
    },
  };