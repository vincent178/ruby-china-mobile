import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import qs from 'querystring';

const cssLoaderQuries = qs.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[path]_[local]_[hash:base64:4]'
});

export default {
  devtool: '#inline-source-map',

  entry: [
    './client/index.js',
    'webpack-hot-middleware/client?noInfo=true&reload=true'
  ],

  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', `css?${cssLoaderQuries}`, 'postcss']
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: [`${__dirname}/client`, `${__dirname}/common`]
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
      }
    ]
  },

  postcss: function() {
    return [autoprefixer, precss];
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

