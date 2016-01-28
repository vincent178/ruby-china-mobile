var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var web = {
  entry: {
    view: './view/app.js',
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/build"
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "babel-loader" }
    ]
  },

  target: 'web'
};

var node = {
  entry: {
    //view: './view/app.js',
    logic: './logic/index.js'
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "babel-loader" },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },

  target: 'node',
  externals: nodeModules
};

module.exports = [web, node]
;