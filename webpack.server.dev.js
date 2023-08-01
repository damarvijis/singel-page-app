const path = require("path");

module.exports = {
  extends: path.resolve(__dirname, './webpack.server.base.js'),
  watch: true,
  mode: 'development',
};