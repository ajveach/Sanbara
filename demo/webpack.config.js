var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/app.js',
  output: { path: path.join(__dirname,"dist"), filename: 'demo.js' },
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