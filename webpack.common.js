import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Auto-discover blog posts ──────────────────────────────────────────────────
// Each post lives in its own subdirectory: src/blog_posts/<slug>/<slug>.{html,js,json}
// Directories prefixed with "_" (e.g. _template) are ignored.
// No changes needed here when adding new posts.
const blogPostDir = "./src/blog_posts";
const blogPostDirs = fs.existsSync(blogPostDir)
  ? fs.readdirSync(blogPostDir, { withFileTypes: true }).filter(
      (d) => d.isDirectory() && !d.name.startsWith("_")
    )
  : [];

const blogPostEntries = Object.fromEntries(
  blogPostDirs.flatMap((d) => {
    const jsPath = `${blogPostDir}/${d.name}/${d.name}.js`;
    return fs.existsSync(jsPath) ? [[`blog_posts/${d.name}`, jsPath]] : [];
  })
);

const blogPostHtmlPlugins = blogPostDirs.flatMap((d) => {
  const htmlPath = `${blogPostDir}/${d.name}/${d.name}.html`;
  if (!fs.existsSync(htmlPath)) return [];
  return [
    new HtmlWebpackPlugin({
      template: htmlPath,
      filename: `blog_posts/${d.name}.html`,
      chunks: [`blog_posts/${d.name}`],
      scriptLoading: "defer",
    }),
  ];
});

// ─────────────────────────────────────────────────────────────────────────────

class GtagPlugin {
  constructor(id) {
    this.id = id;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("GtagPlugin", (compilation) => {
      HtmlWebpackPlugin.getCompilationHooks(compilation).alterAssetTagGroups.tap(
        "GtagPlugin",
        (data) => {
          if (data.plugin.options.filename.startsWith("portfolio-")) return data;
          data.headTags.unshift(
            {
              tagName: "script",
              voidTag: false,
              meta: {},
              attributes: {
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${this.id}`,
              },
            },
            {
              tagName: "script",
              voidTag: false,
              meta: {},
              attributes: {},
              innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${this.id}')`,
            }
          );
          return data;
        }
      );
    });
  }
}

export { GtagPlugin };

export default {
  entry: {
    main: "./src/index.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
    blog: "./src/blog.js",
    ...blogPostEntries,
    "portfolio-luxe-watch": "./src/portfolio-luxe-watch.js",
    "portfolio-cafe":      "./src/portfolio-cafe.js",
    "portfolio-puphub":    "./src/portfolio-puphub.js",
    "portfolio-glostar":   "./src/portfolio-glostar.js",
    "portfolio-photographer": "./src/portfolio-photographer.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: (pathData) => pathData.filename.replace(/^src\//, ""),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
      chunks: ["about"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      filename: "contact.html",
      chunks: ["contact"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/blog.html",
      filename: "blog.html",
      chunks: ["blog"],
      scriptLoading: "defer",
    }),
    ...blogPostHtmlPlugins,
    new HtmlWebpackPlugin({
      template: "./src/portfolio-luxe-watch.html",
      filename: "portfolio-luxe-watch.html",
      chunks: ["portfolio-luxe-watch"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/portfolio-cafe.html",
      filename: "portfolio-cafe.html",
      chunks: ["portfolio-cafe"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/portfolio-puphub.html",
      filename: "portfolio-puphub.html",
      chunks: ["portfolio-puphub"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/portfolio-glostar.html",
      filename: "portfolio-glostar.html",
      chunks: ["portfolio-glostar"],
      scriptLoading: "defer",
    }),
    new HtmlWebpackPlugin({
      template: "./src/portfolio-photographer.html",
      filename: "portfolio-photographer.html",
      chunks: ["portfolio-photographer"],
      scriptLoading: "defer",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        { from: "src/CNAME", to: "CNAME", toType: "file" },
        {
          from: "src/blog_posts",
          to: "blog_posts",
          globOptions: { ignore: ["**/*.html", "**/*.js", "**/*.json"] },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
