const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  output: {
    publicPath: 'http://localhost:3000/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'front',
      library: { type: 'var', name: 'front' },
      remotes: {
        banner: 'banner',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
