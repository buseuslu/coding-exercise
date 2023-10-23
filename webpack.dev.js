const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({
  path: './.env.dev',
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpeg|jpg|gif|png|svg|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 5001,
    historyApiFallback: true,
  },
};
