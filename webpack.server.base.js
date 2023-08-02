const path = require("path");

module.exports = {
  entry: "./dist-js/server/index.js",
  output: {
    filename: "index_server.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
};