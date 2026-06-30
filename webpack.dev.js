import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  devtool: "inline-source-map",
  output: {
    publicPath: "/",
  },
  devServer: {
    static: "./dist",
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      // Mirror GitHub Pages behaviour: redirect extensionless directory paths to
      // the trailing-slash form so relative URLs (e.g. ./cover_photo.webp) resolve
      // from the right base and match what production serves.
      devServer.app.use((req, res, next) => {
        if (req.path !== "/" && !req.path.endsWith("/") && !req.path.includes(".")) {
          res.redirect(301, req.path + "/");
        } else {
          next();
        }
      });
      return middlewares;
    },
  },
});
