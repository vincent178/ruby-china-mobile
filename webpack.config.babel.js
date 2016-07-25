import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssVariable from 'postcss-custom-properties';

const cssLoaderQuery = qs.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[path]_[local]_[hash:base64:4]'
});

const fontLoaderQuery = qs.stringify({
  importLoaders: 1,
  limit: 1000,
  name: '/fonts/[name].[ext]'
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
        loaders: ['style', `css?${cssLoaderQuery}`, 'postcss']
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: [`${__dirname}/client`, `${__dirname}/common`]
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: [`url?${fontLoaderQuery}`]
      }
    ]
  },

  postcss: function() {
    return [postcssImport, postcssVariable, autoprefixer];
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

