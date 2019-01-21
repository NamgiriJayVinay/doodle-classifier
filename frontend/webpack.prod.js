const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  plugins: [
  ],
  mode: 'production',
  devtool: 'source-map'
});
