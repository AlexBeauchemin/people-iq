const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const cssCustomMedia = require('postcss-custom-media');
const colorFunction = require('postcss-color-function');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';
const DEBUG = ENV === 'dev';

const config = {
  devtool: DEBUG ? 'eval-source-map' : false,
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
    // filename: DEBUG ? 'app.js' : 'app.[chunkhash].js',
    filename: 'app.js',
    path: path.join(__dirname, 'docs')
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
        test: /\.css$/,
        include: [path.join(__dirname, '/src/styles')],
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss(wp) {
    return [
      postcssImport({
        addDependencyTo: wp
      }),
      cssCustomMedia,
      precss,
      cssnext,
      colorFunction
    ];
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
    new ExtractTextPlugin('main.css'),
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
  config.module.loaders[1] = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      // style: 'style-loader',
      // css: 'css-loader!postcss-loader',
      // loader: 'css-loader?sourceMap',
      // notExtractLoader: 'style-loader'
      loader: ['css', 'postcss']
    })
  };
}

module.exports = config;
