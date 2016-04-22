const path = require('path');
const webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var precss       = require('precss');


const PATH = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {

  entry: PATH.app,

  output: {
    path: PATH.build,
    filename: 'bundle.js'
  },

  module: {

    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        // loader evaluated from right to left
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATH.app
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },

  postcss: function() {
    return [autoprefixer, precss];
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};