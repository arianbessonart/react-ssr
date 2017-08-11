var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var PUBLIC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, '');


var commonLoaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      cacheDirectory: true,
      presets: ['react', 'es2015', 'stage-0'],
      plugins: [
        // 'transform-decorators-legacy',
        // 'transform-react-constant-elements',
        // 'transform-react-inline-elements',
        // 'lodash'
      ]
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.(png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url'
  },
  {
    test: /\.(woff|woff2|ttf|eot|svg)$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
];

var config = [{
  entry: APP_DIR + '/index.js',
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: commonLoaders,
  }
}, {
  entry: APP_DIR + '/server.js',
  output: {
    path: BUILD_DIR,
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  module: {
    loaders: commonLoaders.concat(
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss!less')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!postcss')
      }
    )
  }
}];

module.exports = config;
