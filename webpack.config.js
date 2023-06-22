const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // import css
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
  }
};
