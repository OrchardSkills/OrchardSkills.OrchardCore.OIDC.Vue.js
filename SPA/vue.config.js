const fs = require('fs')
module.exports = {
  devServer: {
    hot: true,
    https: true,
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    port: 5002
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      excludeChunks: ['silent-renew-oidc']
    },
    silentrenewoidc: {
      entry: 'src/silent-renew-oidc.js',
      template: 'public/silent-renew-oidc.html',
      filename: 'silent-renew-oidc.html',
      excludeChunks: ['app']
    }
  }
}
