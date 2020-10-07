const fs = require('fs')
module.exports = {
  devServer: {
    host: 'localhost',
    disableHostCheck: true,
    https: true,
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    public: 'https://localhost:5002'
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}
