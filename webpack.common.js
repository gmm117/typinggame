const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // entry file
  entry: ['babel-polyfill', './index.js'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname + "/dist")
  },
  devServer: {
    contentBase: path.resolve("./dist"),
    index: "index.html",
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: { minimize: true }
            }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template :  path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html', // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css'
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CleanWebpackPlugin()
  ]
};