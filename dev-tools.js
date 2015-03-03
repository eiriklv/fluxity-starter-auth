'use strict';

const debug = require('debug')('app:dev-server');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.dev');
const livereload = require('livereload');
const fs = require('fs');
const chokidar = require('chokidar');
const async = require('async');
const sass = require('node-sass');

const webpackServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'http://localhost:3000',
  noInfo: true,
  hot: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
}).listen(3001, 'localhost', function(err, result) {
  if (err) console.log(err);
  else debug('Webpack server listening on port 3001');
});

const renderSass = function(filename) {
  sass.render({
    file: __dirname + '/style/main.scss',
    outFile: __dirname + '/public/css/main.css',
    sourceMap: true,
    success: function(data) {
      if (filename) debug('Changed ' + filename);
      
      async.series([
        fs.writeFile.bind(fs, __dirname + '/public/css/main.css.map', data.map, 'utf-8'),
        fs.writeFile.bind(fs, __dirname + '/public/css/main.css', data.css, 'utf-8')
      ], function(err) {
        if (err) debug('error writing css/sourcemap to file:', err);
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
};

chokidar.watch(__dirname + '/style', {
  ignored: /[\/\\]\./
}).on('all', function(event, filename) {
  let ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'scss') return;
  renderSass(filename);
});

const lr = livereload.createServer();
lr.watch(__dirname + '/public');

renderSass();
