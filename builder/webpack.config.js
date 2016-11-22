var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/es6/main.js',
  output: { path: path.join(__dirname,"public","javascripts"), filename: 'builder.min.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};