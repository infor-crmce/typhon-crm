/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var config;
try {
    config = require('./scripts/config.json');
} catch (e) {
    console.warn('WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.');
    config = require('./scripts/default.config.json');
}

var proxyConfig = config.proxy || {};

module.exports = {
  devServer: {
    inline: true,
    port: config.port || 8080,
    proxy: {
      '/sdata': {
        target: {
          host: proxyConfig.host || 'localhost',
          protocol: proxyConfig.protocol || 'http',
          port: proxyConfig.port || 80
        },
      }
    },
    contentBase: path.resolve(__dirname, '../../'),
    staticOptions: {
      index: 'index-dev.html'
    },
  },
  devtool: 'inline-source-map',
  entry: {
    localization: './src/Bootstrap.localization.js',
    core: ['../../argos-sdk/libraries/Simplate.js', './src/ApplicationModule.js', './src/Application.js', './src/Bootstrap'],
    vendor: ['rxjs', 'moment', 'pouchdb', '@infor/icrm-js-common', '@infor/icrm-js-customization'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dev/',
    libraryTarget: 'umd',
    library: ['icrm', '[name]'],
    umdNamedDefine: true,
    filename: 'icrm.[name].js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '../../argos-sdk/src'),
        path.resolve(__dirname, 'node_modules/@infor/icrm-js-common'),
        path.resolve(__dirname, 'node_modules/@infor/icrm-js-customization'),
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          'es2015-without-strict'
        ],
      },
    }, {
      test: /(\.js)$/,
      include: path.resolve(__dirname, '../../argos-sdk/libraries/dojo'),
      loader: 'dojo-webpack-loader',
    }],
  },
  resolve: {
    alias: {
      "dojo": path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dojo'),
      "dijit": path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dijit'),
      "argos": path.resolve(__dirname, '../../argos-sdk/src'),
      "Sage/Platform/Mobile": path.resolve(__dirname, '../../argos-sdk/src'),
      "crm": path.resolve(__dirname, './src'),
      "Mobile/SalesLogix": path.resolve(__dirname, './src'),
      "snap": path.resolve(__dirname, '../../argos-sdk/libraries/snap/snap.js'),
    },
    modules: [
      path.resolve(__dirname, './node_modules/'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../argos-sdk/node_modules/')
    ]
  },
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    */
    // Necessary for dojo-webpack-loader to function (is a webpack 1 loader)
    new webpack.LoaderOptionsPlugin({
      options: {
        dojoWebpackLoader: {
          // We should specify paths to core and dijit modules because we using both
          dojoCorePath: path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dojo'),
          dojoDijitPath: path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dijit'),

          // Languages for dojo/nls module which will be in result pack.
          includeLanguages: ['en', 'ru', 'fr'],
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor', 'core'],
      filename: '[name].bundle.js'
    }),
  ]
};
