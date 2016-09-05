const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'production';
const DEBUG = ENV === 'test';

const config = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: [
    './src/app',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [__dirname, 'node_modules']
  },
  output: {
    filename: DEBUG ? 'app.js' : 'app.[chunkhash].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

if (DEBUG) {
  config.output.publicPath = 'http://localhost:3001/static/';
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
} else {
  config.entry = ['./src/app'];
  config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);

  config.module.loaders[0].loaders = ['babel'];
}

module.exports = config;
