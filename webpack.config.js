const path = require('path');

const PATH = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: PATH.app,
  output: {
    path: PATH.build,
    filename: 'bundle.js'
  }
};