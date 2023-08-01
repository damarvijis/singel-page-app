const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/server/index.js",
  output: {
    filename: "index_server.js",
    path: path.resolve(__dirname, "dist"),
  },
  externalsPreset: { node: true },
  externals: [nodeExternals()],
};