import { merge } from "webpack-merge";
import common, { GtagPlugin } from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new GtagPlugin("G-C7X5DP4MJC"),
  ],
  output: {
    // "auto" generates relative URLs so assets resolve correctly regardless
    // of the deployment sub-path (e.g. GitHub Pages /web-dev/).
    publicPath: "auto",
  },
});
