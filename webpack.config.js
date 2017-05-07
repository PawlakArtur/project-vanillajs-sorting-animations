var path = require('path');
var webpack = require('webpack');

var config = {
  entry: ['./app/scripts/main.js', './app/styles/main.scss'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/main.js',
    publicPath: '/build',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'app/scripts'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: ["app/styles", "app/styles/main"]
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
module.exports = config;