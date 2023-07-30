const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "index_bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [new HtmlWebpackPlugin()],
};