'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
    lib: [
      'react',
      'react-router'
    ],
    main: './flux/client.jsx'
  },

  output: {
    path: './build/public/js',
    filename: 'main.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin(require('./white-listed-env-vars')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      filename: 'lib.js'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },

  module: {
    preLoaders: [{
      exclude: /node_modules/,
      loaders: ['babel']
    }],
    postLoaders: [],
    loaders: []
  },

  externals: {}
};
