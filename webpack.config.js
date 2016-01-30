const path = require('path');
const webpack = require('webpack');

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
        loaders: ['style', 'css'],
        // loader evaluated from right to left
        include: PATH.app
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATH.app
      }
    ]

  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: PATH.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};