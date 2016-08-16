require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[hash:base64:4]'
});
require('./server');