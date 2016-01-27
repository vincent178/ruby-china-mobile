module.exports = {

  entry: {
    view: './view/app.js',
    //logic: './logic/index.js'
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
};