const path = require("path");
const envMode = process.env.NODE_ENV;
const HtmlWebpPlugin = require("html-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const SpeedMeasure = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasure();
module.exports = smp.wrap({
  entry: path.join(__dirname, "src", "index.tsx"),
  mode: envMode,
  devtool:false,
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          envMode == "development" ? "style-loader" : MiniCss.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /.svg$/,
        type: "asset/inline",
      },
      {
        test: /.(jpg|jpeg|png|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        //process images in html template
        test: /\.html$/,
        loader: "html-loader"
      }
    ],
  },
  optimization: {
    minimize: envMode === "production" ? true : false,
    minimizer: [new CssMinimizer(), new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    assetModuleFilename: "img/[name][ext]",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCss({
      filename: "/css/[name].css",
    }),
  ],
});
