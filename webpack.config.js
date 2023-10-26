const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "battleship",
        template: "./src/template.html",
    }),
    ],
  // optimization: {
  //   runtimeChunk: "single",
  // },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        }
    ],
  },
};
