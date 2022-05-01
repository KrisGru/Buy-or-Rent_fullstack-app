const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "./bundle.js",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
};
