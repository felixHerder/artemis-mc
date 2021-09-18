const path = require("path");
const envMode = process.env.NODE_ENV;
const HtmlWebpPlugin = require("html-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const config = {
  entry: path.join(__dirname, "src", "index.tsx"),
  mode: envMode,
  devtool: envMode === "production" ? false : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.s?css$/,
        use: [envMode === "development" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
        loader: "html-loader",
      },
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
    path: process.env.BUILD_PATH 
    ? path.resolve(__dirname, process.env.BUILD_PATH)
    : path.resolve(__dirname, "dist"),

    filename: "js/[name].js",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
    // publicPath:'./'
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new Dotenv({
      path: "./.env",
    }),
    envMode === "development"
      ? () => {}
      : new BundleAnalyzerPlugin({
          analyzerMode: envMode === "production" ? "static" : "disabled",
        }),
    envMode === "development"
      ? () => {}
      : new CompressionPlugin({
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
  ],
};

//// Regular config
module.exports = config;

// Speed Measure Config
// const SpeedMeasure = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasure();
// module.exports = smp.wrap(config);
