const path = require("path");

module.exports = {
  entry: "./src/server/index.ts",
  output: {
    filename: "index_server.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
};