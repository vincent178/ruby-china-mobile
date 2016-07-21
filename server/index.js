require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[path]_[local]_[hash:base64:4]'
});
require('./server');