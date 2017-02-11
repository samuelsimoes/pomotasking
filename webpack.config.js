var webpack = require('webpack'),
    path = require('path'),
    fileSystem = require('fs'),
    env = require('./utils/env'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WriteFilePlugin = require('write-file-webpack-plugin')

var config = {
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    options: path.join(__dirname, 'src', 'js', 'options.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel' },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.(png|ttf)$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.font\.(js|json)$/, loader: 'style!css!fontgen' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png']
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new WriteFilePlugin()
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.module.preLoaders = [
    {
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/
    }
  ]
}

module.exports = config
