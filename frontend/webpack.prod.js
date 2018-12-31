const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');


module.exports = merge(common, {
  plugins: [
  ],
  mode: 'production',
  devtool: 'source-map'
});
