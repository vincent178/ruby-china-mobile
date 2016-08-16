import webpack from 'webpack';
import path from 'path';
import qs from 'querystring';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin'

const cssLoaderQuery = qs.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[hash:base64:4]'
});

const fontLoaderQuery = qs.stringify({
  importLoaders: 1,
  limit: 1000,
  name: '/fonts/[name].[ext]'
});

const isProduction = 'production' == process.env.NODE_ENV;
const client = [ path.resolve('client/index.js') ];
const plugins = [
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new ExtractTextPlugin('app.css?[hash]', { allChunks: true }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
  new AssetsPlugin({
    filename: 'manifest.json',
    fullpath: true,
    path: path.resolve('public'),
    prettyPrint: !isProduction,
    update: true
  })
];


export default {
  devtool: isProduction ? '#source-map' : 'cheap-module-inline-source-map',

  entry: {
    client: isProduction ? client : [
      ...client,
      'webpack-hot-middleware/client?noInfo=true&reload=true'
    ],
    vendor: [
      'babel-polyfill', 'isomorphic-fetch',
      'react', 'react-dom', 'react-router', 'redux', 'react-redux'
    ]
  },

  output: {
    path: path.resolve('public'),
    filename: 'app.js?[hash]'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', `css?${cssLoaderQuery}!postcss`)
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: /client|common/
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: [`url?${fontLoaderQuery}`]
      }
    ]
  },

  postcss: [autoprefixer],

  plugins: isProduction ? [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    })
  ] : [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

