var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: 'build',
    filename: 'index.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'node_modules/html-webpack-template/index.ejs',
      appMountId: 'app',
      devServer: 'http://localhost:8080',
      mobile: true,
    })
  ],
};